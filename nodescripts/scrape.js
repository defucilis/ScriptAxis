const fs = require('fs');
const axios = require('axios');
const ScriptUtils = require("../utilities/ScriptUtils");

const cookie = process.env.npm_config_cookie;
const page = process.env.npm_config_page || 0;
const perPage = process.env.npm_config_perPage || 50;
const url = "https://discuss.eroscripts.com/c/scripts/free-scripts/14/l/top/all.json";

//IN PROGRESS!
/*Still to do: 
    - download images and reupload as 100kB jpeg thumbnails
    - scrape individual pages for descriptions and durations
    - separate out the ones that are missing tags, categories, durations or thumbnails to be processed manually
*/
const getTopics = async (page, perPage) => {
    if(!page) page = 0;
    if(!perPage) perPage = 50;
    const finalUrl = `${url}?ascending=false&page=${page}&per_page=${perPage}`;
    try {
        const response = await axios({
            method: "get",
            url: finalUrl,
            headers: {
                "Discourse-Logged-In": "true",
                "Discourse-Present": "true",
                "Cookie": cookie
            }
        });
        const topics = response.data.topic_list.topics.map(topic => {
            let category = topic.tags[0];
            if(!category) category = "Miscellaneous";
            const output = {
                name: topic.title,
                creator: response.data.users.find(u => u.id === topic.posters[0].user_id).username,
                sourceUrl: `https://discuss.eroscripts.com/t/${topic.slug}/${topic.id}`,
                thumbnail: topic.image_url,
                category: ScriptUtils.formatTag(category),
                tags: topic.tags.slice(1).map(tag => ScriptUtils.formatTag(tag)),
                likeCount: topic.like_count,
                views: topic.views,
                created: new Date(topic.created_at)
            }
            if(!output.thumbnail) delete(output.thumbnail);
            return output;
        });
        fs.writeFile("./nodescripts/scrape.json", JSON.stringify(topics, null, 2), err => {
            if(err) {
                throw err;
            } else {
                console.log("JSON written successfully");
            }
        })
    } catch(err) {
        console.error("Failed to scrape data:", err);
    }
}

getTopics(page, perPage);