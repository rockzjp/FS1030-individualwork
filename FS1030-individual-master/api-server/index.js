import express from 'express'
import routes from './src/routes.js'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express();
const port = 3001;


app.use(cors()); 

app.use((req, res, next) => {
    if (req.method == 'GET' && (req.url == '/contact_form/entries' || req.url.substring(0, '/contact_form/entries/'.length) == '/contact_form/entries/')) {
        if (req.headers.authorization == undefined || !req.headers.authorization) {
            res.status(403).send({
                message: 'token not provided'
            })
            return
        }
        try {
            var decoded = jwt.verify(req.headers.authorization, 'in6MG$haU5ttKoOC%N3j*rC7LNf22YlP1Y!p5OuJfaokTfI4GxMcPoOcJqWKOgqV');
            console.log(decoded)
            next()
        } catch (err) {
            res.status(403).send({
                message: err.message
            })
        }
    } else {
        next()
    }
})
app.use(express.json());
app.use(express.static("public"));
app.use('/', routes);
app.use((req, res, next) => {
    res.status(404).send({
        message: 'not found'
    })
})
export default app.listen(port, function() {
    console.log(`Express server listening on port ${port}.`);
});