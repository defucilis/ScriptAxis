import Layout from '../components/Layout'
import ScriptGrid from '../components/ScriptGrid'

const Index = ({scripts}) => {
    return (
        <Layout>
            <ScriptGrid scripts={scripts}/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/scriptlibrary-8f879/databases/(default)/documents/scripts`);
    let scripts = await res.json();
    while(scripts && scripts.documents && scripts.documents.length < 10 && scripts.documents.length > 0) {
        scripts.documents.push({...scripts.documents[0]});
    }
    return {
        props: {
            scripts: {...scripts}
        }
    }
}

export default Index;