const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { Configuration, OpenAIApi } = require('openai')


const API_KEY = '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'

const url = "mongodb+srv://mirekmirik:kenzo2002@cluster0.qvqfrw4.mongodb.net/?retryWrites=true&w=majority"

const connectToDB = async () => {
    await mongoose.connect(url, { useNewUrlParser: true })
}
connectToDB()

const userSchema = new mongoose.Schema({
    userId: String,
    login: String,
    password: String,
    englishLvl: {
        type: String,
        default: null
    },
    phrasesWithDate: [{
        phrases: [{
            phrase: {
                type: String,
            },
            example: {
                type: String
            }
        }],
        date: {
            type: Date,
            default: Date.now
        }
    }]
})

const User = mongoose.model('User', userSchema)

// setup server
const app = express()
app.use(cors())
app.use(bodyParser.json())

// endpoint for chatGPT

const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);


app.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        if (!login) {
            return res.status(400).json({
                error: 'Login field is empty!',
            });
        }
        if (!password) {
            return res.status(400).json({
                error: 'Password field is empty!',
            });
        }
        const user = await User.findOne({ login });

        if (!user) {
            return res.status(400).json({
                error: 'This user does not exist!'
            })
        }

        if (user.password !== password) {
            return res.status(400).json({
                error: "Password is not correctly..."
            })
        }

        if (user.password == password) {
            return res.status(200).json({
                user
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Something went wrong... Please, check your internet.',
        });
    }
});

app.post('/register', async (req, res) => {
    try {
        const users = await User.find({});
        const { login, password } = req.body;
        console.log(login, password)
        if (!login) {
            return res.status(400).json({
                error: 'Login field is empty!',
            });
        }
        if (!password) {
            return res.status(400).json({
                error: "Password field is empty!"
            })
        }
        if (password.length < 4 || login.length < 4) {
            return res.status(400).json({
                error: "Password or Login length must contain 4 or more symbols!"
            })
        }

        const user = await User.findOne({ login });
        if (user) {
            return res.status(400).json({
                error: 'This user is already registered',
            });
        }
        const newUser = new User({
            userId: users.length,
            login,
            password
        });
        await newUser.save();
        return res.json({
            success: `You are have succesfully registered!`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Something went wrong...',
        });
    }
});

app.post('/englishlvl', async (req, res) => {
    try {
        const { englishLvl, login } = req.body
        console.log(englishLvl)
        if (!englishLvl) {
            return res.status(400).json({
                error: "You are not picked English Lvl!"
            })
        }
        if (englishLvl) {
            const user = await User.findOne({ login: login })
            user.englishLvl = englishLvl
            await user.save()
            res.status(200).json(englishLvl)
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Произошла ошибка при регистрации пользователя',
        });
    }
})

app.post('/completions', async (req, res) => {

    const { messages } = req.body

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: "pretend you are an english teacher" },
            ...messages
        ],
    });

    res.json({ completion: completion.data.choices[0].message })
})


app.post('/sendPhrases', async (req, res) => {
    try {
        const { login, phrases } = req.body;
        if (!login) {
            return res.status(400).json({
                error: 'Login is missing.',
            });
        }
        if (!phrases) {
            return res.status(400).json({
                error: 'Phrases are missing.',
            });
        }
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(404).json({
                error: 'User not found.',
            });
        }
        user.phrasesWithDate.push({ phrases });
        await user.save();

        res.status(200).json({
            success: 'Phrases added successfully.',
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Something went wrong.',
        });
    }
});


// app.get('/topwords', async (req, res) => {
//     const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [
//             // { role: "user", content: "write 10 popular phrases in spoken language for B1-B2 level, as well as an example with text"},
//             {
//                 role: "user", content: `write 1 popular phrases in spoken language  for B1-B2 level, as well as an example with text, just like here:
//             "Phrase: "I'm running late"
//             Example: "Sorry I'm running late, there was a lot of traffic on the way here. Can we still meet at 2 pm?"` },
//         ],
//     });

//     res.json({ completion: completion.data.choices[0].message })
// })

app.post('/topwords', async (req, res) => {
    const { phrases } = req.body
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            // { role: "user", content: "write 10 popular phrases in spoken language for B1-B2 level, as well as an example with text"},
            {
                role: "user", content: `write 1 popular phrases(not "${phrases}") in spoken language  for B1-B2 level, as well as an example with text, just like here:
            "Phrase: "I'm running late"
            Example: "Sorry I'm running late, there was a lot of traffic on the way here. Can we still meet at 2 pm?"` },
        ],
    });

    res.json({ completion: completion.data.choices[0].message })
})


app.get('/user/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({userId})
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(400).json({
            error: "User not found!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }

    // const { login } = req.body
    // try {
    //     const user = await User.findOne({ login })
    //     if (user) {
    //         return res.status(200).json(user)
    //     }
    //     return res.status(400).json({
    //         "error": "Такого пользователя нет!"
    //     })
    // } catch (err) {
    //     console.log(err)
    // }
})

app.post('/translate', async (req, res) => {
    const { text } = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate this into Russian:\n\n${text}\n\n.`,
        temperature: 0.3,
        max_tokens: 256,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    res.json({
        text: response.data.choices[0].text
    })
})




const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server has been started on PORT 8080')
})



