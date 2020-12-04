import Layout from '../components/Layout'
import ScriptGrid from '../components/ScriptGrid'
import axios from 'axios'

const Index = ({scripts}) => {
    return (
        <Layout>
            <ScriptGrid scripts={scripts}/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const res = await axios.get(`https://firestore.googleapis.com/v1/projects/scriptlibrary-8f879/databases/(default)/documents/scripts`);
    let scripts = res.data;
    console.log(scripts.documents);
    scripts = scripts.documents.map(script => {
        return {
            name: script.fields.name.stringValue,
            slug: script.fields.slug.stringValue,
            author: script.fields.author.stringValue,
            duration: script.fields.duration.integerValue,
            description: script.fields.description.stringValue,
            source: script.fields.source.stringValue,
            thumbnail: script.fields.thumbnail.stringValue,
            created: script.fields.created.timestampValue,
            modified: script.fields.modified.timestampValue,
            likes: script.fields.likes.integerValue,
            thumbsdown: script.fields.thumbsdown.integerValue,
            thumbsup: script.fields.thumbsup.integerValue,
            views: script.fields.views.integerValue,
        }
    })
    return {
        props: {
            scripts
        }
    }
}

export default Index;