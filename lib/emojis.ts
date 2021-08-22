const emojis = [
    {
        "key": "100",
        "unicode": "1f4af",
        "name": "hundred points symbol",
        "shortname": ":100:"
    },
    {
        "key": "1234",
        "unicode": "1f522",
        "name": "input symbol for numbers",
        "shortname": ":1234:"
    },
    {
        "key": "grinning",
        "unicode": "1f600",
        "name": "grinning face",
        "shortname": ":grinning:"
    },
    {
        "key": "grimacing",
        "unicode": "1f62c",
        "name": "grimacing face",
        "shortname": ":grimacing:"
    },
    {
        "key": "grin",
        "unicode": "1f601",
        "name": "grinning face with smiling eyes",
        "shortname": ":grin:"
    },
    {
        "key": "joy",
        "unicode": "1f602",
        "name": "face with tears of joy",
        "shortname": ":joy:"
    },
    {
        "key": "smiley",
        "unicode": "1f603",
        "name": "smiling face with open mouth",
        "shortname": ":smiley:"
    },
    {
        "key": "smile",
        "unicode": "1f604",
        "name": "smiling face with open mouth and smiling eyes",
        "shortname": ":smile:"
    },
    {
        "key": "sweat_smile",
        "unicode": "1f605",
        "name": "smiling face with open mouth and cold sweat",
        "shortname": ":sweat_smile:"
    },
    {
        "key": "laughing",
        "unicode": "1f606",
        "name": "smiling face with open mouth and tightly-closed eyes",
        "shortname": ":laughing:"
    },
    {
        "key": "innocent",
        "unicode": "1f607",
        "name": "smiling face with halo",
        "shortname": ":innocent:"
    },
    {
        "key": "wink",
        "unicode": "1f609",
        "name": "winking face",
        "shortname": ":wink:"
    },
    {
        "key": "blush",
        "unicode": "1f60a",
        "name": "smiling face with smiling eyes",
        "shortname": ":blush:"
    },
    {
        "key": "slight_smile",
        "unicode": "1f642",
        "name": "slightly smiling face",
        "shortname": ":slight_smile:"
    },
    {
        "key": "upside_down",
        "unicode": "1f643",
        "name": "upside-down face",
        "shortname": ":upside_down:"
    },
    {
        "key": "relaxed",
        "unicode": "263a",
        "name": "white smiling face",
        "shortname": ":relaxed:"
    },
    {
        "key": "yum",
        "unicode": "1f60b",
        "name": "face savouring delicious food",
        "shortname": ":yum:"
    },
    {
        "key": "relieved",
        "unicode": "1f60c",
        "name": "relieved face",
        "shortname": ":relieved:"
    },
    {
        "key": "heart_eyes",
        "unicode": "1f60d",
        "name": "smiling face with heart-shaped eyes",
        "shortname": ":heart_eyes:"
    },
    {
        "key": "kissing_heart",
        "unicode": "1f618",
        "name": "face throwing a kiss",
        "shortname": ":kissing_heart:"
    },
    {
        "key": "kissing",
        "unicode": "1f617",
        "name": "kissing face",
        "shortname": ":kissing:"
    },
    {
        "key": "kissing_smiling_eyes",
        "unicode": "1f619",
        "name": "kissing face with smiling eyes",
        "shortname": ":kissing_smiling_eyes:"
    },
    {
        "key": "kissing_closed_eyes",
        "unicode": "1f61a",
        "name": "kissing face with closed eyes",
        "shortname": ":kissing_closed_eyes:"
    },
    {
        "key": "stuck_out_tongue_winking_eye",
        "unicode": "1f61c",
        "name": "face with stuck-out tongue and winking eye",
        "shortname": ":stuck_out_tongue_winking_eye:"
    },
    {
        "key": "stuck_out_tongue_closed_eyes",
        "unicode": "1f61d",
        "name": "face with stuck-out tongue and tightly-closed eyes",
        "shortname": ":stuck_out_tongue_closed_eyes:"
    },
    {
        "key": "stuck_out_tongue",
        "unicode": "1f61b",
        "name": "face with stuck-out tongue",
        "shortname": ":stuck_out_tongue:"
    },
    {
        "key": "money_mouth",
        "unicode": "1f911",
        "name": "money-mouth face",
        "shortname": ":money_mouth:"
    },
    {
        "key": "nerd",
        "unicode": "1f913",
        "name": "nerd face",
        "shortname": ":nerd:"
    },
    {
        "key": "sunglasses",
        "unicode": "1f60e",
        "name": "smiling face with sunglasses",
        "shortname": ":sunglasses:"
    },
    {
        "key": "hugging",
        "unicode": "1f917",
        "name": "hugging face",
        "shortname": ":hugging:"
    },
    {
        "key": "smirk",
        "unicode": "1f60f",
        "name": "smirking face",
        "shortname": ":smirk:"
    },
    {
        "key": "no_mouth",
        "unicode": "1f636",
        "name": "face without mouth",
        "shortname": ":no_mouth:"
    },
    {
        "key": "neutral_face",
        "unicode": "1f610",
        "name": "neutral face",
        "shortname": ":neutral_face:"
    },
    {
        "key": "expressionless",
        "unicode": "1f611",
        "name": "expressionless face",
        "shortname": ":expressionless:"
    },
    {
        "key": "unamused",
        "unicode": "1f612",
        "name": "unamused face",
        "shortname": ":unamused:"
    },
    {
        "key": "rolling_eyes",
        "unicode": "1f644",
        "name": "face with rolling eyes",
        "shortname": ":rolling_eyes:"
    },
    {
        "key": "thinking",
        "unicode": "1f914",
        "name": "thinking face",
        "shortname": ":thinking:"
    },
    {
        "key": "flushed",
        "unicode": "1f633",
        "name": "flushed face",
        "shortname": ":flushed:"
    },
    {
        "key": "disappointed",
        "unicode": "1f61e",
        "name": "disappointed face",
        "shortname": ":disappointed:"
    },
    {
        "key": "worried",
        "unicode": "1f61f",
        "name": "worried face",
        "shortname": ":worried:"
    },
    {
        "key": "angry",
        "unicode": "1f620",
        "name": "angry face",
        "shortname": ":angry:"
    },
    {
        "key": "rage",
        "unicode": "1f621",
        "name": "pouting face",
        "shortname": ":rage:"
    },
    {
        "key": "pensive",
        "unicode": "1f614",
        "name": "pensive face",
        "shortname": ":pensive:"
    },
    {
        "key": "confused",
        "unicode": "1f615",
        "name": "confused face",
        "shortname": ":confused:"
    },
    {
        "key": "slight_frown",
        "unicode": "1f641",
        "name": "slightly frowning face",
        "shortname": ":slight_frown:"
    },
    {
        "key": "frowning2",
        "unicode": "2639",
        "name": "white frowning face",
        "shortname": ":frowning2:"
    },
    {
        "key": "persevere",
        "unicode": "1f623",
        "name": "persevering face",
        "shortname": ":persevere:"
    },
    {
        "key": "confounded",
        "unicode": "1f616",
        "name": "confounded face",
        "shortname": ":confounded:"
    },
    {
        "key": "tired_face",
        "unicode": "1f62b",
        "name": "tired face",
        "shortname": ":tired_face:"
    },
    {
        "key": "weary",
        "unicode": "1f629",
        "name": "weary face",
        "shortname": ":weary:"
    },
    {
        "key": "triumph",
        "unicode": "1f624",
        "name": "face with look of triumph",
        "shortname": ":triumph:"
    },
    {
        "key": "open_mouth",
        "unicode": "1f62e",
        "name": "face with open mouth",
        "shortname": ":open_mouth:"
    },
    {
        "key": "scream",
        "unicode": "1f631",
        "name": "face screaming in fear",
        "shortname": ":scream:"
    },
    {
        "key": "fearful",
        "unicode": "1f628",
        "name": "fearful face",
        "shortname": ":fearful:"
    },
    {
        "key": "cold_sweat",
        "unicode": "1f630",
        "name": "face with open mouth and cold sweat",
        "shortname": ":cold_sweat:"
    },
    {
        "key": "hushed",
        "unicode": "1f62f",
        "name": "hushed face",
        "shortname": ":hushed:"
    },
    {
        "key": "frowning",
        "unicode": "1f626",
        "name": "frowning face with open mouth",
        "shortname": ":frowning:"
    },
    {
        "key": "anguished",
        "unicode": "1f627",
        "name": "anguished face",
        "shortname": ":anguished:"
    },
    {
        "key": "cry",
        "unicode": "1f622",
        "name": "crying face",
        "shortname": ":cry:"
    },
    {
        "key": "disappointed_relieved",
        "unicode": "1f625",
        "name": "disappointed but relieved face",
        "shortname": ":disappointed_relieved:"
    },
    {
        "key": "sleepy",
        "unicode": "1f62a",
        "name": "sleepy face",
        "shortname": ":sleepy:"
    },
    {
        "key": "sweat",
        "unicode": "1f613",
        "name": "face with cold sweat",
        "shortname": ":sweat:"
    },
    {
        "key": "sob",
        "unicode": "1f62d",
        "name": "loudly crying face",
        "shortname": ":sob:"
    },
    {
        "key": "dizzy_face",
        "unicode": "1f635",
        "name": "dizzy face",
        "shortname": ":dizzy_face:"
    },
    {
        "key": "astonished",
        "unicode": "1f632",
        "name": "astonished face",
        "shortname": ":astonished:"
    },
    {
        "key": "zipper_mouth",
        "unicode": "1f910",
        "name": "zipper-mouth face",
        "shortname": ":zipper_mouth:"
    },
    {
        "key": "mask",
        "unicode": "1f637",
        "name": "face with medical mask",
        "shortname": ":mask:"
    },
    {
        "key": "thermometer_face",
        "unicode": "1f912",
        "name": "face with thermometer",
        "shortname": ":thermometer_face:"
    },
    {
        "key": "head_bandage",
        "unicode": "1f915",
        "name": "face with head-bandage",
        "shortname": ":head_bandage:"
    },
    {
        "key": "sleeping",
        "unicode": "1f634",
        "name": "sleeping face",
        "shortname": ":sleeping:"
    },
    {
        "key": "zzz",
        "unicode": "1f4a4",
        "name": "sleeping symbol",
        "shortname": ":zzz:"
    },
    {
        "key": "poop",
        "unicode": "1f4a9",
        "name": "pile of poo",
        "shortname": ":poop:"
    },
    {
        "key": "smiling_imp",
        "unicode": "1f608",
        "name": "smiling face with horns",
        "shortname": ":smiling_imp:"
    },
    {
        "key": "imp",
        "unicode": "1f47f",
        "name": "imp",
        "shortname": ":imp:"
    },
    {
        "key": "japanese_ogre",
        "unicode": "1f479",
        "name": "japanese ogre",
        "shortname": ":japanese_ogre:"
    },
    {
        "key": "japanese_goblin",
        "unicode": "1f47a",
        "name": "japanese goblin",
        "shortname": ":japanese_goblin:"
    },
    {
        "key": "skull",
        "unicode": "1f480",
        "name": "skull",
        "shortname": ":skull:"
    },
    {
        "key": "ghost",
        "unicode": "1f47b",
        "name": "ghost",
        "shortname": ":ghost:"
    },
    {
        "key": "alien",
        "unicode": "1f47d",
        "name": "extraterrestrial alien",
        "shortname": ":alien:"
    },
    {
        "key": "robot",
        "unicode": "1f916",
        "name": "robot face",
        "shortname": ":robot:"
    },
    {
        "key": "smiley_cat",
        "unicode": "1f63a",
        "name": "smiling cat face with open mouth",
        "shortname": ":smiley_cat:"
    },
    {
        "key": "smile_cat",
        "unicode": "1f638",
        "name": "grinning cat face with smiling eyes",
        "shortname": ":smile_cat:"
    },
    {
        "key": "joy_cat",
        "unicode": "1f639",
        "name": "cat face with tears of joy",
        "shortname": ":joy_cat:"
    },
    {
        "key": "heart_eyes_cat",
        "unicode": "1f63b",
        "name": "smiling cat face with heart-shaped eyes",
        "shortname": ":heart_eyes_cat:"
    },
    {
        "key": "smirk_cat",
        "unicode": "1f63c",
        "name": "cat face with wry smile",
        "shortname": ":smirk_cat:"
    },
    {
        "key": "kissing_cat",
        "unicode": "1f63d",
        "name": "kissing cat face with closed eyes",
        "shortname": ":kissing_cat:"
    },
    {
        "key": "scream_cat",
        "unicode": "1f640",
        "name": "weary cat face",
        "shortname": ":scream_cat:"
    },
    {
        "key": "crying_cat_face",
        "unicode": "1f63f",
        "name": "crying cat face",
        "shortname": ":crying_cat_face:"
    },
    {
        "key": "pouting_cat",
        "unicode": "1f63e",
        "name": "pouting cat face",
        "shortname": ":pouting_cat:"
    },
    {
        "key": "raised_hands",
        "unicode": "1f64c",
        "name": "person raising both hands in celebration",
        "shortname": ":raised_hands:"
    },
    {
        "key": "clap",
        "unicode": "1f44f",
        "name": "clapping hands sign",
        "shortname": ":clap:"
    },
    {
        "key": "wave",
        "unicode": "1f44b",
        "name": "waving hand sign",
        "shortname": ":wave:"
    },
    {
        "key": "thumbsup",
        "unicode": "1f44d",
        "name": "thumbs up sign",
        "shortname": ":thumbsup:"
    },
    {
        "key": "thumbsdown",
        "unicode": "1f44e",
        "name": "thumbs down sign",
        "shortname": ":thumbsdown:"
    },
    {
        "key": "punch",
        "unicode": "1f44a",
        "name": "fisted hand sign",
        "shortname": ":punch:"
    },
    {
        "key": "fist",
        "unicode": "270a",
        "name": "raised fist",
        "shortname": ":fist:"
    },
    {
        "key": "v",
        "unicode": "270c",
        "name": "victory hand",
        "shortname": ":v:"
    },
    {
        "key": "ok_hand",
        "unicode": "1f44c",
        "name": "ok hand sign",
        "shortname": ":ok_hand:"
    },
    {
        "key": "raised_hand",
        "unicode": "270b",
        "name": "raised hand",
        "shortname": ":raised_hand:"
    },
    {
        "key": "open_hands",
        "unicode": "1f450",
        "name": "open hands sign",
        "shortname": ":open_hands:"
    },
    {
        "key": "muscle",
        "unicode": "1f4aa",
        "name": "flexed biceps",
        "shortname": ":muscle:"
    },
    {
        "key": "pray",
        "unicode": "1f64f",
        "name": "person with folded hands",
        "shortname": ":pray:"
    },
    {
        "key": "point_up",
        "unicode": "261d",
        "name": "white up pointing index",
        "shortname": ":point_up:"
    },
    {
        "key": "point_up_2",
        "unicode": "1f446",
        "name": "white up pointing backhand index",
        "shortname": ":point_up_2:"
    },
    {
        "key": "point_down",
        "unicode": "1f447",
        "name": "white down pointing backhand index",
        "shortname": ":point_down:"
    },
    {
        "key": "point_left",
        "unicode": "1f448",
        "name": "white left pointing backhand index",
        "shortname": ":point_left:"
    },
    {
        "key": "point_right",
        "unicode": "1f449",
        "name": "white right pointing backhand index",
        "shortname": ":point_right:"
    },
    {
        "key": "middle_finger",
        "unicode": "1f595",
        "name": "reversed hand with middle finger extended",
        "shortname": ":middle_finger:"
    },
    {
        "key": "hand_splayed",
        "unicode": "1f590",
        "name": "raised hand with fingers splayed",
        "shortname": ":hand_splayed:"
    },
    {
        "key": "metal",
        "unicode": "1f918",
        "name": "sign of the horns",
        "shortname": ":metal:"
    },
    {
        "key": "vulcan",
        "unicode": "1f596",
        "name": "raised hand with part between middle and ring fingers",
        "shortname": ":vulcan:"
    },
    {
        "key": "writing_hand",
        "unicode": "270d",
        "name": "writing hand",
        "shortname": ":writing_hand:"
    },
    {
        "key": "nail_care",
        "unicode": "1f485",
        "name": "nail polish",
        "shortname": ":nail_care:"
    },
    {
        "key": "lips",
        "unicode": "1f444",
        "name": "mouth",
        "shortname": ":lips:"
    },
    {
        "key": "tongue",
        "unicode": "1f445",
        "name": "tongue",
        "shortname": ":tongue:"
    },
    {
        "key": "ear",
        "unicode": "1f442",
        "name": "ear",
        "shortname": ":ear:"
    },
    {
        "key": "nose",
        "unicode": "1f443",
        "name": "nose",
        "shortname": ":nose:"
    },
    {
        "key": "eye",
        "unicode": "1f441",
        "name": "eye",
        "shortname": ":eye:"
    },
    {
        "key": "eyes",
        "unicode": "1f440",
        "name": "eyes",
        "shortname": ":eyes:"
    },
    {
        "key": "bust_in_silhouette",
        "unicode": "1f464",
        "name": "bust in silhouette",
        "shortname": ":bust_in_silhouette:"
    },
    {
        "key": "busts_in_silhouette",
        "unicode": "1f465",
        "name": "busts in silhouette",
        "shortname": ":busts_in_silhouette:"
    },
    {
        "key": "speaking_head",
        "unicode": "1f5e3",
        "name": "speaking head in silhouette",
        "shortname": ":speaking_head:"
    },
    {
        "key": "baby",
        "unicode": "1f476",
        "name": "baby",
        "shortname": ":baby:"
    },
    {
        "key": "boy",
        "unicode": "1f466",
        "name": "boy",
        "shortname": ":boy:"
    },
    {
        "key": "girl",
        "unicode": "1f467",
        "name": "girl",
        "shortname": ":girl:"
    },
    {
        "key": "man",
        "unicode": "1f468",
        "name": "man",
        "shortname": ":man:"
    },
    {
        "key": "woman",
        "unicode": "1f469",
        "name": "woman",
        "shortname": ":woman:"
    },
    {
        "key": "person_with_blond_hair",
        "unicode": "1f471",
        "name": "person with blond hair",
        "shortname": ":person_with_blond_hair:"
    },
    {
        "key": "older_man",
        "unicode": "1f474",
        "name": "older man",
        "shortname": ":older_man:"
    },
    {
        "key": "older_woman",
        "unicode": "1f475",
        "name": "older woman",
        "shortname": ":older_woman:"
    },
    {
        "key": "man_with_gua_pi_mao",
        "unicode": "1f472",
        "name": "man with gua pi mao",
        "shortname": ":man_with_gua_pi_mao:"
    },
    {
        "key": "man_with_turban",
        "unicode": "1f473",
        "name": "man with turban",
        "shortname": ":man_with_turban:"
    },
    {
        "key": "cop",
        "unicode": "1f46e",
        "name": "police officer",
        "shortname": ":cop:"
    },
    {
        "key": "construction_worker",
        "unicode": "1f477",
        "name": "construction worker",
        "shortname": ":construction_worker:"
    },
    {
        "key": "guardsman",
        "unicode": "1f482",
        "name": "guardsman",
        "shortname": ":guardsman:"
    },
    {
        "key": "spy",
        "unicode": "1f575",
        "name": "sleuth or spy",
        "shortname": ":spy:"
    },
    {
        "key": "santa",
        "unicode": "1f385",
        "name": "father christmas",
        "shortname": ":santa:"
    },
    {
        "key": "angel",
        "unicode": "1f47c",
        "name": "baby angel",
        "shortname": ":angel:"
    },
    {
        "key": "princess",
        "unicode": "1f478",
        "name": "princess",
        "shortname": ":princess:"
    },
    {
        "key": "bride_with_veil",
        "unicode": "1f470",
        "name": "bride with veil",
        "shortname": ":bride_with_veil:"
    },
    {
        "key": "walking",
        "unicode": "1f6b6",
        "name": "pedestrian",
        "shortname": ":walking:"
    },
    {
        "key": "runner",
        "unicode": "1f3c3",
        "name": "runner",
        "shortname": ":runner:"
    },
    {
        "key": "dancer",
        "unicode": "1f483",
        "name": "dancer",
        "shortname": ":dancer:"
    },
    {
        "key": "dancers",
        "unicode": "1f46f",
        "name": "woman with bunny ears",
        "shortname": ":dancers:"
    },
    {
        "key": "couple",
        "unicode": "1f46b",
        "name": "man and woman holding hands",
        "shortname": ":couple:"
    },
    {
        "key": "two_men_holding_hands",
        "unicode": "1f46c",
        "name": "two men holding hands",
        "shortname": ":two_men_holding_hands:"
    },
    {
        "key": "two_women_holding_hands",
        "unicode": "1f46d",
        "name": "two women holding hands",
        "shortname": ":two_women_holding_hands:"
    },
    {
        "key": "bow",
        "unicode": "1f647",
        "name": "person bowing deeply",
        "shortname": ":bow:"
    },
    {
        "key": "information_desk_person",
        "unicode": "1f481",
        "name": "information desk person",
        "shortname": ":information_desk_person:"
    },
    {
        "key": "no_good",
        "unicode": "1f645",
        "name": "face with no good gesture",
        "shortname": ":no_good:"
    },
    {
        "key": "ok_woman",
        "unicode": "1f646",
        "name": "face with ok gesture",
        "shortname": ":ok_woman:"
    },
    {
        "key": "raising_hand",
        "unicode": "1f64b",
        "name": "happy person raising one hand",
        "shortname": ":raising_hand:"
    },
    {
        "key": "person_with_pouting_face",
        "unicode": "1f64e",
        "name": "person with pouting face",
        "shortname": ":person_with_pouting_face:"
    },
    {
        "key": "person_frowning",
        "unicode": "1f64d",
        "name": "person frowning",
        "shortname": ":person_frowning:"
    },
    {
        "key": "haircut",
        "unicode": "1f487",
        "name": "haircut",
        "shortname": ":haircut:"
    },
    {
        "key": "massage",
        "unicode": "1f486",
        "name": "face massage",
        "shortname": ":massage:"
    },
    {
        "key": "couple_with_heart",
        "unicode": "1f491",
        "name": "couple with heart",
        "shortname": ":couple_with_heart:"
    },
    {
        "key": "couple_ww",
        "unicode": "1f469-2764-1f469",
        "name": "couple (woman,woman)",
        "shortname": ":couple_ww:"
    },
    {
        "key": "couple_mm",
        "unicode": "1f468-2764-1f468",
        "name": "couple (man,man)",
        "shortname": ":couple_mm:"
    },
    {
        "key": "couplekiss",
        "unicode": "1f48f",
        "name": "kiss",
        "shortname": ":couplekiss:"
    },
    {
        "key": "kiss_ww",
        "unicode": "1f469-2764-1f48b-1f469",
        "name": "kiss (woman,woman)",
        "shortname": ":kiss_ww:"
    },
    {
        "key": "kiss_mm",
        "unicode": "1f468-2764-1f48b-1f468",
        "name": "kiss (man,man)",
        "shortname": ":kiss_mm:"
    },
    {
        "key": "family",
        "unicode": "1f46a",
        "name": "family",
        "shortname": ":family:"
    },
    {
        "key": "family_mwg",
        "unicode": "1f468-1f469-1f467",
        "name": "family (man,woman,girl)",
        "shortname": ":family_mwg:"
    },
    {
        "key": "family_mwgb",
        "unicode": "1f468-1f469-1f467-1f466",
        "name": "family (man,woman,girl,boy)",
        "shortname": ":family_mwgb:"
    },
    {
        "key": "family_mwbb",
        "unicode": "1f468-1f469-1f466-1f466",
        "name": "family (man,woman,boy,boy)",
        "shortname": ":family_mwbb:"
    },
    {
        "key": "family_mwgg",
        "unicode": "1f468-1f469-1f467-1f467",
        "name": "family (man,woman,girl,girl)",
        "shortname": ":family_mwgg:"
    },
    {
        "key": "family_wwb",
        "unicode": "1f469-1f469-1f466",
        "name": "family (woman,woman,boy)",
        "shortname": ":family_wwb:"
    },
    {
        "key": "family_wwg",
        "unicode": "1f469-1f469-1f467",
        "name": "family (woman,woman,girl)",
        "shortname": ":family_wwg:"
    },
    {
        "key": "family_wwgb",
        "unicode": "1f469-1f469-1f467-1f466",
        "name": "family (woman,woman,girl,boy)",
        "shortname": ":family_wwgb:"
    },
    {
        "key": "family_wwbb",
        "unicode": "1f469-1f469-1f466-1f466",
        "name": "family (woman,woman,boy,boy)",
        "shortname": ":family_wwbb:"
    },
    {
        "key": "family_wwgg",
        "unicode": "1f469-1f469-1f467-1f467",
        "name": "family (woman,woman,girl,girl)",
        "shortname": ":family_wwgg:"
    },
    {
        "key": "family_mmb",
        "unicode": "1f468-1f468-1f466",
        "name": "family (man,man,boy)",
        "shortname": ":family_mmb:"
    },
    {
        "key": "family_mmg",
        "unicode": "1f468-1f468-1f467",
        "name": "family (man,man,girl)",
        "shortname": ":family_mmg:"
    },
    {
        "key": "family_mmgb",
        "unicode": "1f468-1f468-1f467-1f466",
        "name": "family (man,man,girl,boy)",
        "shortname": ":family_mmgb:"
    },
    {
        "key": "family_mmbb",
        "unicode": "1f468-1f468-1f466-1f466",
        "name": "family (man,man,boy,boy)",
        "shortname": ":family_mmbb:"
    },
    {
        "key": "family_mmgg",
        "unicode": "1f468-1f468-1f467-1f467",
        "name": "family (man,man,girl,girl)",
        "shortname": ":family_mmgg:"
    },
    {
        "key": "womans_clothes",
        "unicode": "1f45a",
        "name": "womans clothes",
        "shortname": ":womans_clothes:"
    },
    {
        "key": "shirt",
        "unicode": "1f455",
        "name": "t-shirt",
        "shortname": ":shirt:"
    },
    {
        "key": "jeans",
        "unicode": "1f456",
        "name": "jeans",
        "shortname": ":jeans:"
    },
    {
        "key": "necktie",
        "unicode": "1f454",
        "name": "necktie",
        "shortname": ":necktie:"
    },
    {
        "key": "dress",
        "unicode": "1f457",
        "name": "dress",
        "shortname": ":dress:"
    },
    {
        "key": "bikini",
        "unicode": "1f459",
        "name": "bikini",
        "shortname": ":bikini:"
    },
    {
        "key": "kimono",
        "unicode": "1f458",
        "name": "kimono",
        "shortname": ":kimono:"
    },
    {
        "key": "lipstick",
        "unicode": "1f484",
        "name": "lipstick",
        "shortname": ":lipstick:"
    },
    {
        "key": "kiss",
        "unicode": "1f48b",
        "name": "kiss mark",
        "shortname": ":kiss:"
    },
    {
        "key": "footprints",
        "unicode": "1f463",
        "name": "footprints",
        "shortname": ":footprints:"
    },
    {
        "key": "high_heel",
        "unicode": "1f460",
        "name": "high-heeled shoe",
        "shortname": ":high_heel:"
    },
    {
        "key": "sandal",
        "unicode": "1f461",
        "name": "womans sandal",
        "shortname": ":sandal:"
    },
    {
        "key": "boot",
        "unicode": "1f462",
        "name": "womans boots",
        "shortname": ":boot:"
    },
    {
        "key": "mans_shoe",
        "unicode": "1f45e",
        "name": "mans shoe",
        "shortname": ":mans_shoe:"
    },
    {
        "key": "athletic_shoe",
        "unicode": "1f45f",
        "name": "athletic shoe",
        "shortname": ":athletic_shoe:"
    },
    {
        "key": "womans_hat",
        "unicode": "1f452",
        "name": "womans hat",
        "shortname": ":womans_hat:"
    },
    {
        "key": "tophat",
        "unicode": "1f3a9",
        "name": "top hat",
        "shortname": ":tophat:"
    },
    {
        "key": "helmet_with_cross",
        "unicode": "26d1",
        "name": "helmet with white cross",
        "shortname": ":helmet_with_cross:"
    },
    {
        "key": "mortar_board",
        "unicode": "1f393",
        "name": "graduation cap",
        "shortname": ":mortar_board:"
    },
    {
        "key": "crown",
        "unicode": "1f451",
        "name": "crown",
        "shortname": ":crown:"
    },
    {
        "key": "school_satchel",
        "unicode": "1f392",
        "name": "school satchel",
        "shortname": ":school_satchel:"
    },
    {
        "key": "pouch",
        "unicode": "1f45d",
        "name": "pouch",
        "shortname": ":pouch:"
    },
    {
        "key": "purse",
        "unicode": "1f45b",
        "name": "purse",
        "shortname": ":purse:"
    },
    {
        "key": "handbag",
        "unicode": "1f45c",
        "name": "handbag",
        "shortname": ":handbag:"
    },
    {
        "key": "briefcase",
        "unicode": "1f4bc",
        "name": "briefcase",
        "shortname": ":briefcase:"
    },
    {
        "key": "eyeglasses",
        "unicode": "1f453",
        "name": "eyeglasses",
        "shortname": ":eyeglasses:"
    },
    {
        "key": "dark_sunglasses",
        "unicode": "1f576",
        "name": "dark sunglasses",
        "shortname": ":dark_sunglasses:"
    },
    {
        "key": "ring",
        "unicode": "1f48d",
        "name": "ring",
        "shortname": ":ring:"
    },
    {
        "key": "closed_umbrella",
        "unicode": "1f302",
        "name": "closed umbrella",
        "shortname": ":closed_umbrella:"
    },
    {
        "key": "dog",
        "unicode": "1f436",
        "name": "dog face",
        "shortname": ":dog:"
    },
    {
        "key": "cat",
        "unicode": "1f431",
        "name": "cat face",
        "shortname": ":cat:"
    },
    {
        "key": "mouse",
        "unicode": "1f42d",
        "name": "mouse face",
        "shortname": ":mouse:"
    },
    {
        "key": "hamster",
        "unicode": "1f439",
        "name": "hamster face",
        "shortname": ":hamster:"
    },
    {
        "key": "rabbit",
        "unicode": "1f430",
        "name": "rabbit face",
        "shortname": ":rabbit:"
    },
    {
        "key": "bear",
        "unicode": "1f43b",
        "name": "bear face",
        "shortname": ":bear:"
    },
    {
        "key": "panda_face",
        "unicode": "1f43c",
        "name": "panda face",
        "shortname": ":panda_face:"
    },
    {
        "key": "koala",
        "unicode": "1f428",
        "name": "koala",
        "shortname": ":koala:"
    },
    {
        "key": "tiger",
        "unicode": "1f42f",
        "name": "tiger face",
        "shortname": ":tiger:"
    },
    {
        "key": "lion_face",
        "unicode": "1f981",
        "name": "lion face",
        "shortname": ":lion_face:"
    },
    {
        "key": "cow",
        "unicode": "1f42e",
        "name": "cow face",
        "shortname": ":cow:"
    },
    {
        "key": "pig",
        "unicode": "1f437",
        "name": "pig face",
        "shortname": ":pig:"
    },
    {
        "key": "pig_nose",
        "unicode": "1f43d",
        "name": "pig nose",
        "shortname": ":pig_nose:"
    },
    {
        "key": "frog",
        "unicode": "1f438",
        "name": "frog face",
        "shortname": ":frog:"
    },
    {
        "key": "octopus",
        "unicode": "1f419",
        "name": "octopus",
        "shortname": ":octopus:"
    },
    {
        "key": "monkey_face",
        "unicode": "1f435",
        "name": "monkey face",
        "shortname": ":monkey_face:"
    },
    {
        "key": "see_no_evil",
        "unicode": "1f648",
        "name": "see-no-evil monkey",
        "shortname": ":see_no_evil:"
    },
    {
        "key": "hear_no_evil",
        "unicode": "1f649",
        "name": "hear-no-evil monkey",
        "shortname": ":hear_no_evil:"
    },
    {
        "key": "speak_no_evil",
        "unicode": "1f64a",
        "name": "speak-no-evil monkey",
        "shortname": ":speak_no_evil:"
    },
    {
        "key": "monkey",
        "unicode": "1f412",
        "name": "monkey",
        "shortname": ":monkey:"
    },
    {
        "key": "chicken",
        "unicode": "1f414",
        "name": "chicken",
        "shortname": ":chicken:"
    },
    {
        "key": "penguin",
        "unicode": "1f427",
        "name": "penguin",
        "shortname": ":penguin:"
    },
    {
        "key": "bird",
        "unicode": "1f426",
        "name": "bird",
        "shortname": ":bird:"
    },
    {
        "key": "baby_chick",
        "unicode": "1f424",
        "name": "baby chick",
        "shortname": ":baby_chick:"
    },
    {
        "key": "hatching_chick",
        "unicode": "1f423",
        "name": "hatching chick",
        "shortname": ":hatching_chick:"
    },
    {
        "key": "hatched_chick",
        "unicode": "1f425",
        "name": "front-facing baby chick",
        "shortname": ":hatched_chick:"
    },
    {
        "key": "wolf",
        "unicode": "1f43a",
        "name": "wolf face",
        "shortname": ":wolf:"
    },
    {
        "key": "boar",
        "unicode": "1f417",
        "name": "boar",
        "shortname": ":boar:"
    },
    {
        "key": "horse",
        "unicode": "1f434",
        "name": "horse face",
        "shortname": ":horse:"
    },
    {
        "key": "unicorn",
        "unicode": "1f984",
        "name": "unicorn face",
        "shortname": ":unicorn:"
    },
    {
        "key": "bee",
        "unicode": "1f41d",
        "name": "honeybee",
        "shortname": ":bee:"
    },
    {
        "key": "bug",
        "unicode": "1f41b",
        "name": "bug",
        "shortname": ":bug:"
    },
    {
        "key": "snail",
        "unicode": "1f40c",
        "name": "snail",
        "shortname": ":snail:"
    },
    {
        "key": "beetle",
        "unicode": "1f41e",
        "name": "lady beetle",
        "shortname": ":beetle:"
    },
    {
        "key": "ant",
        "unicode": "1f41c",
        "name": "ant",
        "shortname": ":ant:"
    },
    {
        "key": "spider",
        "unicode": "1f577",
        "name": "spider",
        "shortname": ":spider:"
    },
    {
        "key": "scorpion",
        "unicode": "1f982",
        "name": "scorpion",
        "shortname": ":scorpion:"
    },
    {
        "key": "crab",
        "unicode": "1f980",
        "name": "crab",
        "shortname": ":crab:"
    },
    {
        "key": "snake",
        "unicode": "1f40d",
        "name": "snake",
        "shortname": ":snake:"
    },
    {
        "key": "turtle",
        "unicode": "1f422",
        "name": "turtle",
        "shortname": ":turtle:"
    },
    {
        "key": "tropical_fish",
        "unicode": "1f420",
        "name": "tropical fish",
        "shortname": ":tropical_fish:"
    },
    {
        "key": "fish",
        "unicode": "1f41f",
        "name": "fish",
        "shortname": ":fish:"
    },
    {
        "key": "blowfish",
        "unicode": "1f421",
        "name": "blowfish",
        "shortname": ":blowfish:"
    },
    {
        "key": "dolphin",
        "unicode": "1f42c",
        "name": "dolphin",
        "shortname": ":dolphin:"
    },
    {
        "key": "whale",
        "unicode": "1f433",
        "name": "spouting whale",
        "shortname": ":whale:"
    },
    {
        "key": "whale2",
        "unicode": "1f40b",
        "name": "whale",
        "shortname": ":whale2:"
    },
    {
        "key": "crocodile",
        "unicode": "1f40a",
        "name": "crocodile",
        "shortname": ":crocodile:"
    },
    {
        "key": "leopard",
        "unicode": "1f406",
        "name": "leopard",
        "shortname": ":leopard:"
    },
    {
        "key": "tiger2",
        "unicode": "1f405",
        "name": "tiger",
        "shortname": ":tiger2:"
    },
    {
        "key": "water_buffalo",
        "unicode": "1f403",
        "name": "water buffalo",
        "shortname": ":water_buffalo:"
    },
    {
        "key": "ox",
        "unicode": "1f402",
        "name": "ox",
        "shortname": ":ox:"
    },
    {
        "key": "cow2",
        "unicode": "1f404",
        "name": "cow",
        "shortname": ":cow2:"
    },
    {
        "key": "dromedary_camel",
        "unicode": "1f42a",
        "name": "dromedary camel",
        "shortname": ":dromedary_camel:"
    },
    {
        "key": "camel",
        "unicode": "1f42b",
        "name": "bactrian camel",
        "shortname": ":camel:"
    },
    {
        "key": "elephant",
        "unicode": "1f418",
        "name": "elephant",
        "shortname": ":elephant:"
    },
    {
        "key": "goat",
        "unicode": "1f410",
        "name": "goat",
        "shortname": ":goat:"
    },
    {
        "key": "ram",
        "unicode": "1f40f",
        "name": "ram",
        "shortname": ":ram:"
    },
    {
        "key": "sheep",
        "unicode": "1f411",
        "name": "sheep",
        "shortname": ":sheep:"
    },
    {
        "key": "racehorse",
        "unicode": "1f40e",
        "name": "horse",
        "shortname": ":racehorse:"
    },
    {
        "key": "pig2",
        "unicode": "1f416",
        "name": "pig",
        "shortname": ":pig2:"
    },
    {
        "key": "rat",
        "unicode": "1f400",
        "name": "rat",
        "shortname": ":rat:"
    },
    {
        "key": "mouse2",
        "unicode": "1f401",
        "name": "mouse",
        "shortname": ":mouse2:"
    },
    {
        "key": "rooster",
        "unicode": "1f413",
        "name": "rooster",
        "shortname": ":rooster:"
    },
    {
        "key": "turkey",
        "unicode": "1f983",
        "name": "turkey",
        "shortname": ":turkey:"
    },
    {
        "key": "dove",
        "unicode": "1f54a",
        "name": "dove of peace",
        "shortname": ":dove:"
    },
    {
        "key": "dog2",
        "unicode": "1f415",
        "name": "dog",
        "shortname": ":dog2:"
    },
    {
        "key": "poodle",
        "unicode": "1f429",
        "name": "poodle",
        "shortname": ":poodle:"
    },
    {
        "key": "cat2",
        "unicode": "1f408",
        "name": "cat",
        "shortname": ":cat2:"
    },
    {
        "key": "rabbit2",
        "unicode": "1f407",
        "name": "rabbit",
        "shortname": ":rabbit2:"
    },
    {
        "key": "chipmunk",
        "unicode": "1f43f",
        "name": "chipmunk",
        "shortname": ":chipmunk:"
    },
    {
        "key": "feet",
        "unicode": "1f43e",
        "name": "paw prints",
        "shortname": ":feet:"
    },
    {
        "key": "dragon",
        "unicode": "1f409",
        "name": "dragon",
        "shortname": ":dragon:"
    },
    {
        "key": "dragon_face",
        "unicode": "1f432",
        "name": "dragon face",
        "shortname": ":dragon_face:"
    },
    {
        "key": "cactus",
        "unicode": "1f335",
        "name": "cactus",
        "shortname": ":cactus:"
    },
    {
        "key": "christmas_tree",
        "unicode": "1f384",
        "name": "christmas tree",
        "shortname": ":christmas_tree:"
    },
    {
        "key": "evergreen_tree",
        "unicode": "1f332",
        "name": "evergreen tree",
        "shortname": ":evergreen_tree:"
    },
    {
        "key": "deciduous_tree",
        "unicode": "1f333",
        "name": "deciduous tree",
        "shortname": ":deciduous_tree:"
    },
    {
        "key": "palm_tree",
        "unicode": "1f334",
        "name": "palm tree",
        "shortname": ":palm_tree:"
    },
    {
        "key": "seedling",
        "unicode": "1f331",
        "name": "seedling",
        "shortname": ":seedling:"
    },
    {
        "key": "herb",
        "unicode": "1f33f",
        "name": "herb",
        "shortname": ":herb:"
    },
    {
        "key": "shamrock",
        "unicode": "2618",
        "name": "shamrock",
        "shortname": ":shamrock:"
    },
    {
        "key": "four_leaf_clover",
        "unicode": "1f340",
        "name": "four leaf clover",
        "shortname": ":four_leaf_clover:"
    },
    {
        "key": "bamboo",
        "unicode": "1f38d",
        "name": "pine decoration",
        "shortname": ":bamboo:"
    },
    {
        "key": "tanabata_tree",
        "unicode": "1f38b",
        "name": "tanabata tree",
        "shortname": ":tanabata_tree:"
    },
    {
        "key": "leaves",
        "unicode": "1f343",
        "name": "leaf fluttering in wind",
        "shortname": ":leaves:"
    },
    {
        "key": "fallen_leaf",
        "unicode": "1f342",
        "name": "fallen leaf",
        "shortname": ":fallen_leaf:"
    },
    {
        "key": "maple_leaf",
        "unicode": "1f341",
        "name": "maple leaf",
        "shortname": ":maple_leaf:"
    },
    {
        "key": "ear_of_rice",
        "unicode": "1f33e",
        "name": "ear of rice",
        "shortname": ":ear_of_rice:"
    },
    {
        "key": "hibiscus",
        "unicode": "1f33a",
        "name": "hibiscus",
        "shortname": ":hibiscus:"
    },
    {
        "key": "sunflower",
        "unicode": "1f33b",
        "name": "sunflower",
        "shortname": ":sunflower:"
    },
    {
        "key": "rose",
        "unicode": "1f339",
        "name": "rose",
        "shortname": ":rose:"
    },
    {
        "key": "tulip",
        "unicode": "1f337",
        "name": "tulip",
        "shortname": ":tulip:"
    },
    {
        "key": "blossom",
        "unicode": "1f33c",
        "name": "blossom",
        "shortname": ":blossom:"
    },
    {
        "key": "cherry_blossom",
        "unicode": "1f338",
        "name": "cherry blossom",
        "shortname": ":cherry_blossom:"
    },
    {
        "key": "bouquet",
        "unicode": "1f490",
        "name": "bouquet",
        "shortname": ":bouquet:"
    },
    {
        "key": "mushroom",
        "unicode": "1f344",
        "name": "mushroom",
        "shortname": ":mushroom:"
    },
    {
        "key": "chestnut",
        "unicode": "1f330",
        "name": "chestnut",
        "shortname": ":chestnut:"
    },
    {
        "key": "jack_o_lantern",
        "unicode": "1f383",
        "name": "jack-o-lantern",
        "shortname": ":jack_o_lantern:"
    },
    {
        "key": "shell",
        "unicode": "1f41a",
        "name": "spiral shell",
        "shortname": ":shell:"
    },
    {
        "key": "spider_web",
        "unicode": "1f578",
        "name": "spider web",
        "shortname": ":spider_web:"
    },
    {
        "key": "earth_americas",
        "unicode": "1f30e",
        "name": "earth globe americas",
        "shortname": ":earth_americas:"
    },
    {
        "key": "earth_africa",
        "unicode": "1f30d",
        "name": "earth globe europe-africa",
        "shortname": ":earth_africa:"
    },
    {
        "key": "earth_asia",
        "unicode": "1f30f",
        "name": "earth globe asia-australia",
        "shortname": ":earth_asia:"
    },
    {
        "key": "full_moon",
        "unicode": "1f315",
        "name": "full moon symbol",
        "shortname": ":full_moon:"
    },
    {
        "key": "waning_gibbous_moon",
        "unicode": "1f316",
        "name": "waning gibbous moon symbol",
        "shortname": ":waning_gibbous_moon:"
    },
    {
        "key": "last_quarter_moon",
        "unicode": "1f317",
        "name": "last quarter moon symbol",
        "shortname": ":last_quarter_moon:"
    },
    {
        "key": "waning_crescent_moon",
        "unicode": "1f318",
        "name": "waning crescent moon symbol",
        "shortname": ":waning_crescent_moon:"
    },
    {
        "key": "new_moon",
        "unicode": "1f311",
        "name": "new moon symbol",
        "shortname": ":new_moon:"
    },
    {
        "key": "waxing_crescent_moon",
        "unicode": "1f312",
        "name": "waxing crescent moon symbol",
        "shortname": ":waxing_crescent_moon:"
    },
    {
        "key": "first_quarter_moon",
        "unicode": "1f313",
        "name": "first quarter moon symbol",
        "shortname": ":first_quarter_moon:"
    },
    {
        "key": "waxing_gibbous_moon",
        "unicode": "1f314",
        "name": "waxing gibbous moon symbol",
        "shortname": ":waxing_gibbous_moon:"
    },
    {
        "key": "new_moon_with_face",
        "unicode": "1f31a",
        "name": "new moon with face",
        "shortname": ":new_moon_with_face:"
    },
    {
        "key": "full_moon_with_face",
        "unicode": "1f31d",
        "name": "full moon with face",
        "shortname": ":full_moon_with_face:"
    },
    {
        "key": "first_quarter_moon_with_face",
        "unicode": "1f31b",
        "name": "first quarter moon with face",
        "shortname": ":first_quarter_moon_with_face:"
    },
    {
        "key": "last_quarter_moon_with_face",
        "unicode": "1f31c",
        "name": "last quarter moon with face",
        "shortname": ":last_quarter_moon_with_face:"
    },
    {
        "key": "sun_with_face",
        "unicode": "1f31e",
        "name": "sun with face",
        "shortname": ":sun_with_face:"
    },
    {
        "key": "crescent_moon",
        "unicode": "1f319",
        "name": "crescent moon",
        "shortname": ":crescent_moon:"
    },
    {
        "key": "star",
        "unicode": "2b50",
        "name": "white medium star",
        "shortname": ":star:"
    },
    {
        "key": "star2",
        "unicode": "1f31f",
        "name": "glowing star",
        "shortname": ":star2:"
    },
    {
        "key": "dizzy",
        "unicode": "1f4ab",
        "name": "dizzy symbol",
        "shortname": ":dizzy:"
    },
    {
        "key": "sparkles",
        "unicode": "2728",
        "name": "sparkles",
        "shortname": ":sparkles:"
    },
    {
        "key": "comet",
        "unicode": "2604",
        "name": "comet",
        "shortname": ":comet:"
    },
    {
        "key": "sunny",
        "unicode": "2600",
        "name": "black sun with rays",
        "shortname": ":sunny:"
    },
    {
        "key": "white_sun_small_cloud",
        "unicode": "1f324",
        "name": "white sun with small cloud",
        "shortname": ":white_sun_small_cloud:"
    },
    {
        "key": "partly_sunny",
        "unicode": "26c5",
        "name": "sun behind cloud",
        "shortname": ":partly_sunny:"
    },
    {
        "key": "white_sun_cloud",
        "unicode": "1f325",
        "name": "white sun behind cloud",
        "shortname": ":white_sun_cloud:"
    },
    {
        "key": "white_sun_rain_cloud",
        "unicode": "1f326",
        "name": "white sun behind cloud with rain",
        "shortname": ":white_sun_rain_cloud:"
    },
    {
        "key": "cloud",
        "unicode": "2601",
        "name": "cloud",
        "shortname": ":cloud:"
    },
    {
        "key": "cloud_rain",
        "unicode": "1f327",
        "name": "cloud with rain",
        "shortname": ":cloud_rain:"
    },
    {
        "key": "thunder_cloud_rain",
        "unicode": "26c8",
        "name": "thunder cloud and rain",
        "shortname": ":thunder_cloud_rain:"
    },
    {
        "key": "cloud_lightning",
        "unicode": "1f329",
        "name": "cloud with lightning",
        "shortname": ":cloud_lightning:"
    },
    {
        "key": "zap",
        "unicode": "26a1",
        "name": "high voltage sign",
        "shortname": ":zap:"
    },
    {
        "key": "fire",
        "unicode": "1f525",
        "name": "fire",
        "shortname": ":fire:"
    },
    {
        "key": "boom",
        "unicode": "1f4a5",
        "name": "collision symbol",
        "shortname": ":boom:"
    },
    {
        "key": "snowflake",
        "unicode": "2744",
        "name": "snowflake",
        "shortname": ":snowflake:"
    },
    {
        "key": "cloud_snow",
        "unicode": "1f328",
        "name": "cloud with snow",
        "shortname": ":cloud_snow:"
    },
    {
        "key": "snowman2",
        "unicode": "2603",
        "name": "snowman",
        "shortname": ":snowman2:"
    },
    {
        "key": "snowman",
        "unicode": "26c4",
        "name": "snowman without snow",
        "shortname": ":snowman:"
    },
    {
        "key": "wind_blowing_face",
        "unicode": "1f32c",
        "name": "wind blowing face",
        "shortname": ":wind_blowing_face:"
    },
    {
        "key": "dash",
        "unicode": "1f4a8",
        "name": "dash symbol",
        "shortname": ":dash:"
    },
    {
        "key": "cloud_tornado",
        "unicode": "1f32a",
        "name": "cloud with tornado",
        "shortname": ":cloud_tornado:"
    },
    {
        "key": "fog",
        "unicode": "1f32b",
        "name": "fog",
        "shortname": ":fog:"
    },
    {
        "key": "umbrella2",
        "unicode": "2602",
        "name": "umbrella",
        "shortname": ":umbrella2:"
    },
    {
        "key": "umbrella",
        "unicode": "2614",
        "name": "umbrella with rain drops",
        "shortname": ":umbrella:"
    },
    {
        "key": "droplet",
        "unicode": "1f4a7",
        "name": "droplet",
        "shortname": ":droplet:"
    },
    {
        "key": "sweat_drops",
        "unicode": "1f4a6",
        "name": "splashing sweat symbol",
        "shortname": ":sweat_drops:"
    },
    {
        "key": "ocean",
        "unicode": "1f30a",
        "name": "water wave",
        "shortname": ":ocean:"
    },
    {
        "key": "green_apple",
        "unicode": "1f34f",
        "name": "green apple",
        "shortname": ":green_apple:"
    },
    {
        "key": "apple",
        "unicode": "1f34e",
        "name": "red apple",
        "shortname": ":apple:"
    },
    {
        "key": "pear",
        "unicode": "1f350",
        "name": "pear",
        "shortname": ":pear:"
    },
    {
        "key": "tangerine",
        "unicode": "1f34a",
        "name": "tangerine",
        "shortname": ":tangerine:"
    },
    {
        "key": "lemon",
        "unicode": "1f34b",
        "name": "lemon",
        "shortname": ":lemon:"
    },
    {
        "key": "banana",
        "unicode": "1f34c",
        "name": "banana",
        "shortname": ":banana:"
    },
    {
        "key": "watermelon",
        "unicode": "1f349",
        "name": "watermelon",
        "shortname": ":watermelon:"
    },
    {
        "key": "grapes",
        "unicode": "1f347",
        "name": "grapes",
        "shortname": ":grapes:"
    },
    {
        "key": "strawberry",
        "unicode": "1f353",
        "name": "strawberry",
        "shortname": ":strawberry:"
    },
    {
        "key": "melon",
        "unicode": "1f348",
        "name": "melon",
        "shortname": ":melon:"
    },
    {
        "key": "cherries",
        "unicode": "1f352",
        "name": "cherries",
        "shortname": ":cherries:"
    },
    {
        "key": "peach",
        "unicode": "1f351",
        "name": "peach",
        "shortname": ":peach:"
    },
    {
        "key": "pineapple",
        "unicode": "1f34d",
        "name": "pineapple",
        "shortname": ":pineapple:"
    },
    {
        "key": "tomato",
        "unicode": "1f345",
        "name": "tomato",
        "shortname": ":tomato:"
    },
    {
        "key": "eggplant",
        "unicode": "1f346",
        "name": "aubergine",
        "shortname": ":eggplant:"
    },
    {
        "key": "hot_pepper",
        "unicode": "1f336",
        "name": "hot pepper",
        "shortname": ":hot_pepper:"
    },
    {
        "key": "corn",
        "unicode": "1f33d",
        "name": "ear of maize",
        "shortname": ":corn:"
    },
    {
        "key": "sweet_potato",
        "unicode": "1f360",
        "name": "roasted sweet potato",
        "shortname": ":sweet_potato:"
    },
    {
        "key": "honey_pot",
        "unicode": "1f36f",
        "name": "honey pot",
        "shortname": ":honey_pot:"
    },
    {
        "key": "bread",
        "unicode": "1f35e",
        "name": "bread",
        "shortname": ":bread:"
    },
    {
        "key": "cheese",
        "unicode": "1f9c0",
        "name": "cheese wedge",
        "shortname": ":cheese:"
    },
    {
        "key": "poultry_leg",
        "unicode": "1f357",
        "name": "poultry leg",
        "shortname": ":poultry_leg:"
    },
    {
        "key": "meat_on_bone",
        "unicode": "1f356",
        "name": "meat on bone",
        "shortname": ":meat_on_bone:"
    },
    {
        "key": "fried_shrimp",
        "unicode": "1f364",
        "name": "fried shrimp",
        "shortname": ":fried_shrimp:"
    },
    {
        "key": "egg",
        "unicode": "1f373",
        "name": "cooking",
        "shortname": ":egg:"
    },
    {
        "key": "hamburger",
        "unicode": "1f354",
        "name": "hamburger",
        "shortname": ":hamburger:"
    },
    {
        "key": "fries",
        "unicode": "1f35f",
        "name": "french fries",
        "shortname": ":fries:"
    },
    {
        "key": "hotdog",
        "unicode": "1f32d",
        "name": "hot dog",
        "shortname": ":hotdog:"
    },
    {
        "key": "pizza",
        "unicode": "1f355",
        "name": "slice of pizza",
        "shortname": ":pizza:"
    },
    {
        "key": "spaghetti",
        "unicode": "1f35d",
        "name": "spaghetti",
        "shortname": ":spaghetti:"
    },
    {
        "key": "taco",
        "unicode": "1f32e",
        "name": "taco",
        "shortname": ":taco:"
    },
    {
        "key": "burrito",
        "unicode": "1f32f",
        "name": "burrito",
        "shortname": ":burrito:"
    },
    {
        "key": "ramen",
        "unicode": "1f35c",
        "name": "steaming bowl",
        "shortname": ":ramen:"
    },
    {
        "key": "stew",
        "unicode": "1f372",
        "name": "pot of food",
        "shortname": ":stew:"
    },
    {
        "key": "fish_cake",
        "unicode": "1f365",
        "name": "fish cake with swirl design",
        "shortname": ":fish_cake:"
    },
    {
        "key": "sushi",
        "unicode": "1f363",
        "name": "sushi",
        "shortname": ":sushi:"
    },
    {
        "key": "bento",
        "unicode": "1f371",
        "name": "bento box",
        "shortname": ":bento:"
    },
    {
        "key": "curry",
        "unicode": "1f35b",
        "name": "curry and rice",
        "shortname": ":curry:"
    },
    {
        "key": "rice_ball",
        "unicode": "1f359",
        "name": "rice ball",
        "shortname": ":rice_ball:"
    },
    {
        "key": "rice",
        "unicode": "1f35a",
        "name": "cooked rice",
        "shortname": ":rice:"
    },
    {
        "key": "rice_cracker",
        "unicode": "1f358",
        "name": "rice cracker",
        "shortname": ":rice_cracker:"
    },
    {
        "key": "oden",
        "unicode": "1f362",
        "name": "oden",
        "shortname": ":oden:"
    },
    {
        "key": "dango",
        "unicode": "1f361",
        "name": "dango",
        "shortname": ":dango:"
    },
    {
        "key": "shaved_ice",
        "unicode": "1f367",
        "name": "shaved ice",
        "shortname": ":shaved_ice:"
    },
    {
        "key": "ice_cream",
        "unicode": "1f368",
        "name": "ice cream",
        "shortname": ":ice_cream:"
    },
    {
        "key": "icecream",
        "unicode": "1f366",
        "name": "soft ice cream",
        "shortname": ":icecream:"
    },
    {
        "key": "cake",
        "unicode": "1f370",
        "name": "shortcake",
        "shortname": ":cake:"
    },
    {
        "key": "birthday",
        "unicode": "1f382",
        "name": "birthday cake",
        "shortname": ":birthday:"
    },
    {
        "key": "custard",
        "unicode": "1f36e",
        "name": "custard",
        "shortname": ":custard:"
    },
    {
        "key": "candy",
        "unicode": "1f36c",
        "name": "candy",
        "shortname": ":candy:"
    },
    {
        "key": "lollipop",
        "unicode": "1f36d",
        "name": "lollipop",
        "shortname": ":lollipop:"
    },
    {
        "key": "chocolate_bar",
        "unicode": "1f36b",
        "name": "chocolate bar",
        "shortname": ":chocolate_bar:"
    },
    {
        "key": "popcorn",
        "unicode": "1f37f",
        "name": "popcorn",
        "shortname": ":popcorn:"
    },
    {
        "key": "doughnut",
        "unicode": "1f369",
        "name": "doughnut",
        "shortname": ":doughnut:"
    },
    {
        "key": "cookie",
        "unicode": "1f36a",
        "name": "cookie",
        "shortname": ":cookie:"
    },
    {
        "key": "beer",
        "unicode": "1f37a",
        "name": "beer mug",
        "shortname": ":beer:"
    },
    {
        "key": "beers",
        "unicode": "1f37b",
        "name": "clinking beer mugs",
        "shortname": ":beers:"
    },
    {
        "key": "wine_glass",
        "unicode": "1f377",
        "name": "wine glass",
        "shortname": ":wine_glass:"
    },
    {
        "key": "cocktail",
        "unicode": "1f378",
        "name": "cocktail glass",
        "shortname": ":cocktail:"
    },
    {
        "key": "tropical_drink",
        "unicode": "1f379",
        "name": "tropical drink",
        "shortname": ":tropical_drink:"
    },
    {
        "key": "champagne",
        "unicode": "1f37e",
        "name": "bottle with popping cork",
        "shortname": ":champagne:"
    },
    {
        "key": "sake",
        "unicode": "1f376",
        "name": "sake bottle and cup",
        "shortname": ":sake:"
    },
    {
        "key": "tea",
        "unicode": "1f375",
        "name": "teacup without handle",
        "shortname": ":tea:"
    },
    {
        "key": "coffee",
        "unicode": "2615",
        "name": "hot beverage",
        "shortname": ":coffee:"
    },
    {
        "key": "baby_bottle",
        "unicode": "1f37c",
        "name": "baby bottle",
        "shortname": ":baby_bottle:"
    },
    {
        "key": "fork_and_knife",
        "unicode": "1f374",
        "name": "fork and knife",
        "shortname": ":fork_and_knife:"
    },
    {
        "key": "fork_knife_plate",
        "unicode": "1f37d",
        "name": "fork and knife with plate",
        "shortname": ":fork_knife_plate:"
    },
    {
        "key": "soccer",
        "unicode": "26bd",
        "name": "soccer ball",
        "shortname": ":soccer:"
    },
    {
        "key": "basketball",
        "unicode": "1f3c0",
        "name": "basketball and hoop",
        "shortname": ":basketball:"
    },
    {
        "key": "football",
        "unicode": "1f3c8",
        "name": "american football",
        "shortname": ":football:"
    },
    {
        "key": "baseball",
        "unicode": "26be",
        "name": "baseball",
        "shortname": ":baseball:"
    },
    {
        "key": "tennis",
        "unicode": "1f3be",
        "name": "tennis racquet and ball",
        "shortname": ":tennis:"
    },
    {
        "key": "volleyball",
        "unicode": "1f3d0",
        "name": "volleyball",
        "shortname": ":volleyball:"
    },
    {
        "key": "rugby_football",
        "unicode": "1f3c9",
        "name": "rugby football",
        "shortname": ":rugby_football:"
    },
    {
        "key": "8ball",
        "unicode": "1f3b1",
        "name": "billiards",
        "shortname": ":8ball:"
    },
    {
        "key": "golf",
        "unicode": "26f3",
        "name": "flag in hole",
        "shortname": ":golf:"
    },
    {
        "key": "golfer",
        "unicode": "1f3cc",
        "name": "golfer",
        "shortname": ":golfer:"
    },
    {
        "key": "ping_pong",
        "unicode": "1f3d3",
        "name": "table tennis paddle and ball",
        "shortname": ":ping_pong:"
    },
    {
        "key": "badminton",
        "unicode": "1f3f8",
        "name": "badminton racquet",
        "shortname": ":badminton:"
    },
    {
        "key": "hockey",
        "unicode": "1f3d2",
        "name": "ice hockey stick and puck",
        "shortname": ":hockey:"
    },
    {
        "key": "field_hockey",
        "unicode": "1f3d1",
        "name": "field hockey stick and ball",
        "shortname": ":field_hockey:"
    },
    {
        "key": "cricket",
        "unicode": "1f3cf",
        "name": "cricket bat and ball",
        "shortname": ":cricket:"
    },
    {
        "key": "ski",
        "unicode": "1f3bf",
        "name": "ski and ski boot",
        "shortname": ":ski:"
    },
    {
        "key": "skier",
        "unicode": "26f7",
        "name": "skier",
        "shortname": ":skier:"
    },
    {
        "key": "snowboarder",
        "unicode": "1f3c2",
        "name": "snowboarder",
        "shortname": ":snowboarder:"
    },
    {
        "key": "ice_skate",
        "unicode": "26f8",
        "name": "ice skate",
        "shortname": ":ice_skate:"
    },
    {
        "key": "bow_and_arrow",
        "unicode": "1f3f9",
        "name": "bow and arrow",
        "shortname": ":bow_and_arrow:"
    },
    {
        "key": "fishing_pole_and_fish",
        "unicode": "1f3a3",
        "name": "fishing pole and fish",
        "shortname": ":fishing_pole_and_fish:"
    },
    {
        "key": "rowboat",
        "unicode": "1f6a3",
        "name": "rowboat",
        "shortname": ":rowboat:"
    },
    {
        "key": "swimmer",
        "unicode": "1f3ca",
        "name": "swimmer",
        "shortname": ":swimmer:"
    },
    {
        "key": "surfer",
        "unicode": "1f3c4",
        "name": "surfer",
        "shortname": ":surfer:"
    },
    {
        "key": "bath",
        "unicode": "1f6c0",
        "name": "bath",
        "shortname": ":bath:"
    },
    {
        "key": "basketball_player",
        "unicode": "26f9",
        "name": "person with ball",
        "shortname": ":basketball_player:"
    },
    {
        "key": "lifter",
        "unicode": "1f3cb",
        "name": "weight lifter",
        "shortname": ":lifter:"
    },
    {
        "key": "bicyclist",
        "unicode": "1f6b4",
        "name": "bicyclist",
        "shortname": ":bicyclist:"
    },
    {
        "key": "mountain_bicyclist",
        "unicode": "1f6b5",
        "name": "mountain bicyclist",
        "shortname": ":mountain_bicyclist:"
    },
    {
        "key": "horse_racing",
        "unicode": "1f3c7",
        "name": "horse racing",
        "shortname": ":horse_racing:"
    },
    {
        "key": "levitate",
        "unicode": "1f574",
        "name": "man in business suit levitating",
        "shortname": ":levitate:"
    },
    {
        "key": "trophy",
        "unicode": "1f3c6",
        "name": "trophy",
        "shortname": ":trophy:"
    },
    {
        "key": "running_shirt_with_sash",
        "unicode": "1f3bd",
        "name": "running shirt with sash",
        "shortname": ":running_shirt_with_sash:"
    },
    {
        "key": "medal",
        "unicode": "1f3c5",
        "name": "sports medal",
        "shortname": ":medal:"
    },
    {
        "key": "military_medal",
        "unicode": "1f396",
        "name": "military medal",
        "shortname": ":military_medal:"
    },
    {
        "key": "reminder_ribbon",
        "unicode": "1f397",
        "name": "reminder ribbon",
        "shortname": ":reminder_ribbon:"
    },
    {
        "key": "rosette",
        "unicode": "1f3f5",
        "name": "rosette",
        "shortname": ":rosette:"
    },
    {
        "key": "ticket",
        "unicode": "1f3ab",
        "name": "ticket",
        "shortname": ":ticket:"
    },
    {
        "key": "tickets",
        "unicode": "1f39f",
        "name": "admission tickets",
        "shortname": ":tickets:"
    },
    {
        "key": "performing_arts",
        "unicode": "1f3ad",
        "name": "performing arts",
        "shortname": ":performing_arts:"
    },
    {
        "key": "art",
        "unicode": "1f3a8",
        "name": "artist palette",
        "shortname": ":art:"
    },
    {
        "key": "circus_tent",
        "unicode": "1f3aa",
        "name": "circus tent",
        "shortname": ":circus_tent:"
    },
    {
        "key": "microphone",
        "unicode": "1f3a4",
        "name": "microphone",
        "shortname": ":microphone:"
    },
    {
        "key": "headphones",
        "unicode": "1f3a7",
        "name": "headphone",
        "shortname": ":headphones:"
    },
    {
        "key": "musical_score",
        "unicode": "1f3bc",
        "name": "musical score",
        "shortname": ":musical_score:"
    },
    {
        "key": "musical_keyboard",
        "unicode": "1f3b9",
        "name": "musical keyboard",
        "shortname": ":musical_keyboard:"
    },
    {
        "key": "saxophone",
        "unicode": "1f3b7",
        "name": "saxophone",
        "shortname": ":saxophone:"
    },
    {
        "key": "trumpet",
        "unicode": "1f3ba",
        "name": "trumpet",
        "shortname": ":trumpet:"
    },
    {
        "key": "guitar",
        "unicode": "1f3b8",
        "name": "guitar",
        "shortname": ":guitar:"
    },
    {
        "key": "violin",
        "unicode": "1f3bb",
        "name": "violin",
        "shortname": ":violin:"
    },
    {
        "key": "clapper",
        "unicode": "1f3ac",
        "name": "clapper board",
        "shortname": ":clapper:"
    },
    {
        "key": "video_game",
        "unicode": "1f3ae",
        "name": "video game",
        "shortname": ":video_game:"
    },
    {
        "key": "space_invader",
        "unicode": "1f47e",
        "name": "alien monster",
        "shortname": ":space_invader:"
    },
    {
        "key": "dart",
        "unicode": "1f3af",
        "name": "direct hit",
        "shortname": ":dart:"
    },
    {
        "key": "game_die",
        "unicode": "1f3b2",
        "name": "game die",
        "shortname": ":game_die:"
    },
    {
        "key": "slot_machine",
        "unicode": "1f3b0",
        "name": "slot machine",
        "shortname": ":slot_machine:"
    },
    {
        "key": "bowling",
        "unicode": "1f3b3",
        "name": "bowling",
        "shortname": ":bowling:"
    },
    {
        "key": "red_car",
        "unicode": "1f697",
        "name": "automobile",
        "shortname": ":red_car:"
    },
    {
        "key": "taxi",
        "unicode": "1f695",
        "name": "taxi",
        "shortname": ":taxi:"
    },
    {
        "key": "blue_car",
        "unicode": "1f699",
        "name": "recreational vehicle",
        "shortname": ":blue_car:"
    },
    {
        "key": "bus",
        "unicode": "1f68c",
        "name": "bus",
        "shortname": ":bus:"
    },
    {
        "key": "trolleybus",
        "unicode": "1f68e",
        "name": "trolleybus",
        "shortname": ":trolleybus:"
    },
    {
        "key": "race_car",
        "unicode": "1f3ce",
        "name": "racing car",
        "shortname": ":race_car:"
    },
    {
        "key": "police_car",
        "unicode": "1f693",
        "name": "police car",
        "shortname": ":police_car:"
    },
    {
        "key": "ambulance",
        "unicode": "1f691",
        "name": "ambulance",
        "shortname": ":ambulance:"
    },
    {
        "key": "fire_engine",
        "unicode": "1f692",
        "name": "fire engine",
        "shortname": ":fire_engine:"
    },
    {
        "key": "minibus",
        "unicode": "1f690",
        "name": "minibus",
        "shortname": ":minibus:"
    },
    {
        "key": "truck",
        "unicode": "1f69a",
        "name": "delivery truck",
        "shortname": ":truck:"
    },
    {
        "key": "articulated_lorry",
        "unicode": "1f69b",
        "name": "articulated lorry",
        "shortname": ":articulated_lorry:"
    },
    {
        "key": "tractor",
        "unicode": "1f69c",
        "name": "tractor",
        "shortname": ":tractor:"
    },
    {
        "key": "motorcycle",
        "unicode": "1f3cd",
        "name": "racing motorcycle",
        "shortname": ":motorcycle:"
    },
    {
        "key": "bike",
        "unicode": "1f6b2",
        "name": "bicycle",
        "shortname": ":bike:"
    },
    {
        "key": "rotating_light",
        "unicode": "1f6a8",
        "name": "police cars revolving light",
        "shortname": ":rotating_light:"
    },
    {
        "key": "oncoming_police_car",
        "unicode": "1f694",
        "name": "oncoming police car",
        "shortname": ":oncoming_police_car:"
    },
    {
        "key": "oncoming_bus",
        "unicode": "1f68d",
        "name": "oncoming bus",
        "shortname": ":oncoming_bus:"
    },
    {
        "key": "oncoming_automobile",
        "unicode": "1f698",
        "name": "oncoming automobile",
        "shortname": ":oncoming_automobile:"
    },
    {
        "key": "oncoming_taxi",
        "unicode": "1f696",
        "name": "oncoming taxi",
        "shortname": ":oncoming_taxi:"
    },
    {
        "key": "aerial_tramway",
        "unicode": "1f6a1",
        "name": "aerial tramway",
        "shortname": ":aerial_tramway:"
    },
    {
        "key": "mountain_cableway",
        "unicode": "1f6a0",
        "name": "mountain cableway",
        "shortname": ":mountain_cableway:"
    },
    {
        "key": "suspension_railway",
        "unicode": "1f69f",
        "name": "suspension railway",
        "shortname": ":suspension_railway:"
    },
    {
        "key": "railway_car",
        "unicode": "1f683",
        "name": "railway car",
        "shortname": ":railway_car:"
    },
    {
        "key": "train",
        "unicode": "1f68b",
        "name": "tram car",
        "shortname": ":train:"
    },
    {
        "key": "monorail",
        "unicode": "1f69d",
        "name": "monorail",
        "shortname": ":monorail:"
    },
    {
        "key": "bullettrain_side",
        "unicode": "1f684",
        "name": "high-speed train",
        "shortname": ":bullettrain_side:"
    },
    {
        "key": "bullettrain_front",
        "unicode": "1f685",
        "name": "high-speed train with bullet nose",
        "shortname": ":bullettrain_front:"
    },
    {
        "key": "light_rail",
        "unicode": "1f688",
        "name": "light rail",
        "shortname": ":light_rail:"
    },
    {
        "key": "mountain_railway",
        "unicode": "1f69e",
        "name": "mountain railway",
        "shortname": ":mountain_railway:"
    },
    {
        "key": "steam_locomotive",
        "unicode": "1f682",
        "name": "steam locomotive",
        "shortname": ":steam_locomotive:"
    },
    {
        "key": "train2",
        "unicode": "1f686",
        "name": "train",
        "shortname": ":train2:"
    },
    {
        "key": "metro",
        "unicode": "1f687",
        "name": "metro",
        "shortname": ":metro:"
    },
    {
        "key": "tram",
        "unicode": "1f68a",
        "name": "tram",
        "shortname": ":tram:"
    },
    {
        "key": "station",
        "unicode": "1f689",
        "name": "station",
        "shortname": ":station:"
    },
    {
        "key": "helicopter",
        "unicode": "1f681",
        "name": "helicopter",
        "shortname": ":helicopter:"
    },
    {
        "key": "airplane_small",
        "unicode": "1f6e9",
        "name": "small airplane",
        "shortname": ":airplane_small:"
    },
    {
        "key": "airplane",
        "unicode": "2708",
        "name": "airplane",
        "shortname": ":airplane:"
    },
    {
        "key": "airplane_departure",
        "unicode": "1f6eb",
        "name": "airplane departure",
        "shortname": ":airplane_departure:"
    },
    {
        "key": "airplane_arriving",
        "unicode": "1f6ec",
        "name": "airplane arriving",
        "shortname": ":airplane_arriving:"
    },
    {
        "key": "sailboat",
        "unicode": "26f5",
        "name": "sailboat",
        "shortname": ":sailboat:"
    },
    {
        "key": "motorboat",
        "unicode": "1f6e5",
        "name": "motorboat",
        "shortname": ":motorboat:"
    },
    {
        "key": "speedboat",
        "unicode": "1f6a4",
        "name": "speedboat",
        "shortname": ":speedboat:"
    },
    {
        "key": "ferry",
        "unicode": "26f4",
        "name": "ferry",
        "shortname": ":ferry:"
    },
    {
        "key": "cruise_ship",
        "unicode": "1f6f3",
        "name": "passenger ship",
        "shortname": ":cruise_ship:"
    },
    {
        "key": "rocket",
        "unicode": "1f680",
        "name": "rocket",
        "shortname": ":rocket:"
    },
    {
        "key": "satellite_orbital",
        "unicode": "1f6f0",
        "name": "satellite",
        "shortname": ":satellite_orbital:"
    },
    {
        "key": "seat",
        "unicode": "1f4ba",
        "name": "seat",
        "shortname": ":seat:"
    },
    {
        "key": "anchor",
        "unicode": "2693",
        "name": "anchor",
        "shortname": ":anchor:"
    },
    {
        "key": "construction",
        "unicode": "1f6a7",
        "name": "construction sign",
        "shortname": ":construction:"
    },
    {
        "key": "fuelpump",
        "unicode": "26fd",
        "name": "fuel pump",
        "shortname": ":fuelpump:"
    },
    {
        "key": "busstop",
        "unicode": "1f68f",
        "name": "bus stop",
        "shortname": ":busstop:"
    },
    {
        "key": "vertical_traffic_light",
        "unicode": "1f6a6",
        "name": "vertical traffic light",
        "shortname": ":vertical_traffic_light:"
    },
    {
        "key": "traffic_light",
        "unicode": "1f6a5",
        "name": "horizontal traffic light",
        "shortname": ":traffic_light:"
    },
    {
        "key": "checkered_flag",
        "unicode": "1f3c1",
        "name": "chequered flag",
        "shortname": ":checkered_flag:"
    },
    {
        "key": "ship",
        "unicode": "1f6a2",
        "name": "ship",
        "shortname": ":ship:"
    },
    {
        "key": "ferris_wheel",
        "unicode": "1f3a1",
        "name": "ferris wheel",
        "shortname": ":ferris_wheel:"
    },
    {
        "key": "roller_coaster",
        "unicode": "1f3a2",
        "name": "roller coaster",
        "shortname": ":roller_coaster:"
    },
    {
        "key": "carousel_horse",
        "unicode": "1f3a0",
        "name": "carousel horse",
        "shortname": ":carousel_horse:"
    },
    {
        "key": "construction_site",
        "unicode": "1f3d7",
        "name": "building construction",
        "shortname": ":construction_site:"
    },
    {
        "key": "foggy",
        "unicode": "1f301",
        "name": "foggy",
        "shortname": ":foggy:"
    },
    {
        "key": "tokyo_tower",
        "unicode": "1f5fc",
        "name": "tokyo tower",
        "shortname": ":tokyo_tower:"
    },
    {
        "key": "factory",
        "unicode": "1f3ed",
        "name": "factory",
        "shortname": ":factory:"
    },
    {
        "key": "fountain",
        "unicode": "26f2",
        "name": "fountain",
        "shortname": ":fountain:"
    },
    {
        "key": "rice_scene",
        "unicode": "1f391",
        "name": "moon viewing ceremony",
        "shortname": ":rice_scene:"
    },
    {
        "key": "mountain",
        "unicode": "26f0",
        "name": "mountain",
        "shortname": ":mountain:"
    },
    {
        "key": "mountain_snow",
        "unicode": "1f3d4",
        "name": "snow capped mountain",
        "shortname": ":mountain_snow:"
    },
    {
        "key": "mount_fuji",
        "unicode": "1f5fb",
        "name": "mount fuji",
        "shortname": ":mount_fuji:"
    },
    {
        "key": "volcano",
        "unicode": "1f30b",
        "name": "volcano",
        "shortname": ":volcano:"
    },
    {
        "key": "japan",
        "unicode": "1f5fe",
        "name": "silhouette of japan",
        "shortname": ":japan:"
    },
    {
        "key": "camping",
        "unicode": "1f3d5",
        "name": "camping",
        "shortname": ":camping:"
    },
    {
        "key": "tent",
        "unicode": "26fa",
        "name": "tent",
        "shortname": ":tent:"
    },
    {
        "key": "park",
        "unicode": "1f3de",
        "name": "national park",
        "shortname": ":park:"
    },
    {
        "key": "motorway",
        "unicode": "1f6e3",
        "name": "motorway",
        "shortname": ":motorway:"
    },
    {
        "key": "railway_track",
        "unicode": "1f6e4",
        "name": "railway track",
        "shortname": ":railway_track:"
    },
    {
        "key": "sunrise",
        "unicode": "1f305",
        "name": "sunrise",
        "shortname": ":sunrise:"
    },
    {
        "key": "sunrise_over_mountains",
        "unicode": "1f304",
        "name": "sunrise over mountains",
        "shortname": ":sunrise_over_mountains:"
    },
    {
        "key": "desert",
        "unicode": "1f3dc",
        "name": "desert",
        "shortname": ":desert:"
    },
    {
        "key": "beach",
        "unicode": "1f3d6",
        "name": "beach with umbrella",
        "shortname": ":beach:"
    },
    {
        "key": "island",
        "unicode": "1f3dd",
        "name": "desert island",
        "shortname": ":island:"
    },
    {
        "key": "city_sunset",
        "unicode": "1f307",
        "name": "sunset over buildings",
        "shortname": ":city_sunset:"
    },
    {
        "key": "city_dusk",
        "unicode": "1f306",
        "name": "cityscape at dusk",
        "shortname": ":city_dusk:"
    },
    {
        "key": "cityscape",
        "unicode": "1f3d9",
        "name": "cityscape",
        "shortname": ":cityscape:"
    },
    {
        "key": "night_with_stars",
        "unicode": "1f303",
        "name": "night with stars",
        "shortname": ":night_with_stars:"
    },
    {
        "key": "bridge_at_night",
        "unicode": "1f309",
        "name": "bridge at night",
        "shortname": ":bridge_at_night:"
    },
    {
        "key": "milky_way",
        "unicode": "1f30c",
        "name": "milky way",
        "shortname": ":milky_way:"
    },
    {
        "key": "stars",
        "unicode": "1f320",
        "name": "shooting star",
        "shortname": ":stars:"
    },
    {
        "key": "sparkler",
        "unicode": "1f387",
        "name": "firework sparkler",
        "shortname": ":sparkler:"
    },
    {
        "key": "fireworks",
        "unicode": "1f386",
        "name": "fireworks",
        "shortname": ":fireworks:"
    },
    {
        "key": "rainbow",
        "unicode": "1f308",
        "name": "rainbow",
        "shortname": ":rainbow:"
    },
    {
        "key": "homes",
        "unicode": "1f3d8",
        "name": "house buildings",
        "shortname": ":homes:"
    },
    {
        "key": "european_castle",
        "unicode": "1f3f0",
        "name": "european castle",
        "shortname": ":european_castle:"
    },
    {
        "key": "japanese_castle",
        "unicode": "1f3ef",
        "name": "japanese castle",
        "shortname": ":japanese_castle:"
    },
    {
        "key": "stadium",
        "unicode": "1f3df",
        "name": "stadium",
        "shortname": ":stadium:"
    },
    {
        "key": "statue_of_liberty",
        "unicode": "1f5fd",
        "name": "statue of liberty",
        "shortname": ":statue_of_liberty:"
    },
    {
        "key": "house",
        "unicode": "1f3e0",
        "name": "house building",
        "shortname": ":house:"
    },
    {
        "key": "house_with_garden",
        "unicode": "1f3e1",
        "name": "house with garden",
        "shortname": ":house_with_garden:"
    },
    {
        "key": "house_abandoned",
        "unicode": "1f3da",
        "name": "derelict house building",
        "shortname": ":house_abandoned:"
    },
    {
        "key": "office",
        "unicode": "1f3e2",
        "name": "office building",
        "shortname": ":office:"
    },
    {
        "key": "department_store",
        "unicode": "1f3ec",
        "name": "department store",
        "shortname": ":department_store:"
    },
    {
        "key": "post_office",
        "unicode": "1f3e3",
        "name": "japanese post office",
        "shortname": ":post_office:"
    },
    {
        "key": "european_post_office",
        "unicode": "1f3e4",
        "name": "european post office",
        "shortname": ":european_post_office:"
    },
    {
        "key": "hospital",
        "unicode": "1f3e5",
        "name": "hospital",
        "shortname": ":hospital:"
    },
    {
        "key": "bank",
        "unicode": "1f3e6",
        "name": "bank",
        "shortname": ":bank:"
    },
    {
        "key": "hotel",
        "unicode": "1f3e8",
        "name": "hotel",
        "shortname": ":hotel:"
    },
    {
        "key": "convenience_store",
        "unicode": "1f3ea",
        "name": "convenience store",
        "shortname": ":convenience_store:"
    },
    {
        "key": "school",
        "unicode": "1f3eb",
        "name": "school",
        "shortname": ":school:"
    },
    {
        "key": "love_hotel",
        "unicode": "1f3e9",
        "name": "love hotel",
        "shortname": ":love_hotel:"
    },
    {
        "key": "wedding",
        "unicode": "1f492",
        "name": "wedding",
        "shortname": ":wedding:"
    },
    {
        "key": "classical_building",
        "unicode": "1f3db",
        "name": "classical building",
        "shortname": ":classical_building:"
    },
    {
        "key": "church",
        "unicode": "26ea",
        "name": "church",
        "shortname": ":church:"
    },
    {
        "key": "mosque",
        "unicode": "1f54c",
        "name": "mosque",
        "shortname": ":mosque:"
    },
    {
        "key": "synagogue",
        "unicode": "1f54d",
        "name": "synagogue",
        "shortname": ":synagogue:"
    },
    {
        "key": "kaaba",
        "unicode": "1f54b",
        "name": "kaaba",
        "shortname": ":kaaba:"
    },
    {
        "key": "shinto_shrine",
        "unicode": "26e9",
        "name": "shinto shrine",
        "shortname": ":shinto_shrine:"
    },
    {
        "key": "watch",
        "unicode": "231a",
        "name": "watch",
        "shortname": ":watch:"
    },
    {
        "key": "iphone",
        "unicode": "1f4f1",
        "name": "mobile phone",
        "shortname": ":iphone:"
    },
    {
        "key": "calling",
        "unicode": "1f4f2",
        "name": "mobile phone with rightwards arrow at left",
        "shortname": ":calling:"
    },
    {
        "key": "computer",
        "unicode": "1f4bb",
        "name": "personal computer",
        "shortname": ":computer:"
    },
    {
        "key": "keyboard",
        "unicode": "2328",
        "name": "keyboard",
        "shortname": ":keyboard:"
    },
    {
        "key": "desktop",
        "unicode": "1f5a5",
        "name": "desktop computer",
        "shortname": ":desktop:"
    },
    {
        "key": "printer",
        "unicode": "1f5a8",
        "name": "printer",
        "shortname": ":printer:"
    },
    {
        "key": "mouse_three_button",
        "unicode": "1f5b1",
        "name": "three button mouse",
        "shortname": ":mouse_three_button:"
    },
    {
        "key": "trackball",
        "unicode": "1f5b2",
        "name": "trackball",
        "shortname": ":trackball:"
    },
    {
        "key": "joystick",
        "unicode": "1f579",
        "name": "joystick",
        "shortname": ":joystick:"
    },
    {
        "key": "compression",
        "unicode": "1f5dc",
        "name": "compression",
        "shortname": ":compression:"
    },
    {
        "key": "minidisc",
        "unicode": "1f4bd",
        "name": "minidisc",
        "shortname": ":minidisc:"
    },
    {
        "key": "floppy_disk",
        "unicode": "1f4be",
        "name": "floppy disk",
        "shortname": ":floppy_disk:"
    },
    {
        "key": "cd",
        "unicode": "1f4bf",
        "name": "optical disc",
        "shortname": ":cd:"
    },
    {
        "key": "dvd",
        "unicode": "1f4c0",
        "name": "dvd",
        "shortname": ":dvd:"
    },
    {
        "key": "vhs",
        "unicode": "1f4fc",
        "name": "videocassette",
        "shortname": ":vhs:"
    },
    {
        "key": "camera",
        "unicode": "1f4f7",
        "name": "camera",
        "shortname": ":camera:"
    },
    {
        "key": "camera_with_flash",
        "unicode": "1f4f8",
        "name": "camera with flash",
        "shortname": ":camera_with_flash:"
    },
    {
        "key": "video_camera",
        "unicode": "1f4f9",
        "name": "video camera",
        "shortname": ":video_camera:"
    },
    {
        "key": "movie_camera",
        "unicode": "1f3a5",
        "name": "movie camera",
        "shortname": ":movie_camera:"
    },
    {
        "key": "projector",
        "unicode": "1f4fd",
        "name": "film projector",
        "shortname": ":projector:"
    },
    {
        "key": "film_frames",
        "unicode": "1f39e",
        "name": "film frames",
        "shortname": ":film_frames:"
    },
    {
        "key": "telephone_receiver",
        "unicode": "1f4de",
        "name": "telephone receiver",
        "shortname": ":telephone_receiver:"
    },
    {
        "key": "telephone",
        "unicode": "260e",
        "name": "black telephone",
        "shortname": ":telephone:"
    },
    {
        "key": "pager",
        "unicode": "1f4df",
        "name": "pager",
        "shortname": ":pager:"
    },
    {
        "key": "fax",
        "unicode": "1f4e0",
        "name": "fax machine",
        "shortname": ":fax:"
    },
    {
        "key": "tv",
        "unicode": "1f4fa",
        "name": "television",
        "shortname": ":tv:"
    },
    {
        "key": "radio",
        "unicode": "1f4fb",
        "name": "radio",
        "shortname": ":radio:"
    },
    {
        "key": "microphone2",
        "unicode": "1f399",
        "name": "studio microphone",
        "shortname": ":microphone2:"
    },
    {
        "key": "level_slider",
        "unicode": "1f39a",
        "name": "level slider",
        "shortname": ":level_slider:"
    },
    {
        "key": "control_knobs",
        "unicode": "1f39b",
        "name": "control knobs",
        "shortname": ":control_knobs:"
    },
    {
        "key": "stopwatch",
        "unicode": "23f1",
        "name": "stopwatch",
        "shortname": ":stopwatch:"
    },
    {
        "key": "timer",
        "unicode": "23f2",
        "name": "timer clock",
        "shortname": ":timer:"
    },
    {
        "key": "alarm_clock",
        "unicode": "23f0",
        "name": "alarm clock",
        "shortname": ":alarm_clock:"
    },
    {
        "key": "clock",
        "unicode": "1f570",
        "name": "mantlepiece clock",
        "shortname": ":clock:"
    },
    {
        "key": "hourglass_flowing_sand",
        "unicode": "23f3",
        "name": "hourglass with flowing sand",
        "shortname": ":hourglass_flowing_sand:"
    },
    {
        "key": "hourglass",
        "unicode": "231b",
        "name": "hourglass",
        "shortname": ":hourglass:"
    },
    {
        "key": "satellite",
        "unicode": "1f4e1",
        "name": "satellite antenna",
        "shortname": ":satellite:"
    },
    {
        "key": "battery",
        "unicode": "1f50b",
        "name": "battery",
        "shortname": ":battery:"
    },
    {
        "key": "electric_plug",
        "unicode": "1f50c",
        "name": "electric plug",
        "shortname": ":electric_plug:"
    },
    {
        "key": "bulb",
        "unicode": "1f4a1",
        "name": "electric light bulb",
        "shortname": ":bulb:"
    },
    {
        "key": "flashlight",
        "unicode": "1f526",
        "name": "electric torch",
        "shortname": ":flashlight:"
    },
    {
        "key": "candle",
        "unicode": "1f56f",
        "name": "candle",
        "shortname": ":candle:"
    },
    {
        "key": "wastebasket",
        "unicode": "1f5d1",
        "name": "wastebasket",
        "shortname": ":wastebasket:"
    },
    {
        "key": "oil",
        "unicode": "1f6e2",
        "name": "oil drum",
        "shortname": ":oil:"
    },
    {
        "key": "money_with_wings",
        "unicode": "1f4b8",
        "name": "money with wings",
        "shortname": ":money_with_wings:"
    },
    {
        "key": "dollar",
        "unicode": "1f4b5",
        "name": "banknote with dollar sign",
        "shortname": ":dollar:"
    },
    {
        "key": "yen",
        "unicode": "1f4b4",
        "name": "banknote with yen sign",
        "shortname": ":yen:"
    },
    {
        "key": "euro",
        "unicode": "1f4b6",
        "name": "banknote with euro sign",
        "shortname": ":euro:"
    },
    {
        "key": "pound",
        "unicode": "1f4b7",
        "name": "banknote with pound sign",
        "shortname": ":pound:"
    },
    {
        "key": "moneybag",
        "unicode": "1f4b0",
        "name": "money bag",
        "shortname": ":moneybag:"
    },
    {
        "key": "credit_card",
        "unicode": "1f4b3",
        "name": "credit card",
        "shortname": ":credit_card:"
    },
    {
        "key": "gem",
        "unicode": "1f48e",
        "name": "gem stone",
        "shortname": ":gem:"
    },
    {
        "key": "scales",
        "unicode": "2696",
        "name": "scales",
        "shortname": ":scales:"
    },
    {
        "key": "wrench",
        "unicode": "1f527",
        "name": "wrench",
        "shortname": ":wrench:"
    },
    {
        "key": "hammer",
        "unicode": "1f528",
        "name": "hammer",
        "shortname": ":hammer:"
    },
    {
        "key": "hammer_pick",
        "unicode": "2692",
        "name": "hammer and pick",
        "shortname": ":hammer_pick:"
    },
    {
        "key": "tools",
        "unicode": "1f6e0",
        "name": "hammer and wrench",
        "shortname": ":tools:"
    },
    {
        "key": "pick",
        "unicode": "26cf",
        "name": "pick",
        "shortname": ":pick:"
    },
    {
        "key": "nut_and_bolt",
        "unicode": "1f529",
        "name": "nut and bolt",
        "shortname": ":nut_and_bolt:"
    },
    {
        "key": "gear",
        "unicode": "2699",
        "name": "gear",
        "shortname": ":gear:"
    },
    {
        "key": "chains",
        "unicode": "26d3",
        "name": "chains",
        "shortname": ":chains:"
    },
    {
        "key": "gun",
        "unicode": "1f52b",
        "name": "pistol",
        "shortname": ":gun:"
    },
    {
        "key": "bomb",
        "unicode": "1f4a3",
        "name": "bomb",
        "shortname": ":bomb:"
    },
    {
        "key": "knife",
        "unicode": "1f52a",
        "name": "hocho",
        "shortname": ":knife:"
    },
    {
        "key": "dagger",
        "unicode": "1f5e1",
        "name": "dagger knife",
        "shortname": ":dagger:"
    },
    {
        "key": "crossed_swords",
        "unicode": "2694",
        "name": "crossed swords",
        "shortname": ":crossed_swords:"
    },
    {
        "key": "shield",
        "unicode": "1f6e1",
        "name": "shield",
        "shortname": ":shield:"
    },
    {
        "key": "smoking",
        "unicode": "1f6ac",
        "name": "smoking symbol",
        "shortname": ":smoking:"
    },
    {
        "key": "skull_crossbones",
        "unicode": "2620",
        "name": "skull and crossbones",
        "shortname": ":skull_crossbones:"
    },
    {
        "key": "coffin",
        "unicode": "26b0",
        "name": "coffin",
        "shortname": ":coffin:"
    },
    {
        "key": "urn",
        "unicode": "26b1",
        "name": "funeral urn",
        "shortname": ":urn:"
    },
    {
        "key": "amphora",
        "unicode": "1f3fa",
        "name": "amphora",
        "shortname": ":amphora:"
    },
    {
        "key": "crystal_ball",
        "unicode": "1f52e",
        "name": "crystal ball",
        "shortname": ":crystal_ball:"
    },
    {
        "key": "prayer_beads",
        "unicode": "1f4ff",
        "name": "prayer beads",
        "shortname": ":prayer_beads:"
    },
    {
        "key": "barber",
        "unicode": "1f488",
        "name": "barber pole",
        "shortname": ":barber:"
    },
    {
        "key": "alembic",
        "unicode": "2697",
        "name": "alembic",
        "shortname": ":alembic:"
    },
    {
        "key": "telescope",
        "unicode": "1f52d",
        "name": "telescope",
        "shortname": ":telescope:"
    },
    {
        "key": "microscope",
        "unicode": "1f52c",
        "name": "microscope",
        "shortname": ":microscope:"
    },
    {
        "key": "hole",
        "unicode": "1f573",
        "name": "hole",
        "shortname": ":hole:"
    },
    {
        "key": "pill",
        "unicode": "1f48a",
        "name": "pill",
        "shortname": ":pill:"
    },
    {
        "key": "syringe",
        "unicode": "1f489",
        "name": "syringe",
        "shortname": ":syringe:"
    },
    {
        "key": "thermometer",
        "unicode": "1f321",
        "name": "thermometer",
        "shortname": ":thermometer:"
    },
    {
        "key": "label",
        "unicode": "1f3f7",
        "name": "label",
        "shortname": ":label:"
    },
    {
        "key": "bookmark",
        "unicode": "1f516",
        "name": "bookmark",
        "shortname": ":bookmark:"
    },
    {
        "key": "toilet",
        "unicode": "1f6bd",
        "name": "toilet",
        "shortname": ":toilet:"
    },
    {
        "key": "shower",
        "unicode": "1f6bf",
        "name": "shower",
        "shortname": ":shower:"
    },
    {
        "key": "bathtub",
        "unicode": "1f6c1",
        "name": "bathtub",
        "shortname": ":bathtub:"
    },
    {
        "key": "key",
        "unicode": "1f511",
        "name": "key",
        "shortname": ":key:"
    },
    {
        "key": "key2",
        "unicode": "1f5dd",
        "name": "old key",
        "shortname": ":key2:"
    },
    {
        "key": "couch",
        "unicode": "1f6cb",
        "name": "couch and lamp",
        "shortname": ":couch:"
    },
    {
        "key": "sleeping_accommodation",
        "unicode": "1f6cc",
        "name": "sleeping accommodation",
        "shortname": ":sleeping_accommodation:"
    },
    {
        "key": "bed",
        "unicode": "1f6cf",
        "name": "bed",
        "shortname": ":bed:"
    },
    {
        "key": "door",
        "unicode": "1f6aa",
        "name": "door",
        "shortname": ":door:"
    },
    {
        "key": "bellhop",
        "unicode": "1f6ce",
        "name": "bellhop bell",
        "shortname": ":bellhop:"
    },
    {
        "key": "frame_photo",
        "unicode": "1f5bc",
        "name": "frame with picture",
        "shortname": ":frame_photo:"
    },
    {
        "key": "map",
        "unicode": "1f5fa",
        "name": "world map",
        "shortname": ":map:"
    },
    {
        "key": "beach_umbrella",
        "unicode": "26f1",
        "name": "umbrella on ground",
        "shortname": ":beach_umbrella:"
    },
    {
        "key": "moyai",
        "unicode": "1f5ff",
        "name": "moyai",
        "shortname": ":moyai:"
    },
    {
        "key": "shopping_bags",
        "unicode": "1f6cd",
        "name": "shopping bags",
        "shortname": ":shopping_bags:"
    },
    {
        "key": "balloon",
        "unicode": "1f388",
        "name": "balloon",
        "shortname": ":balloon:"
    },
    {
        "key": "flags",
        "unicode": "1f38f",
        "name": "carp streamer",
        "shortname": ":flags:"
    },
    {
        "key": "ribbon",
        "unicode": "1f380",
        "name": "ribbon",
        "shortname": ":ribbon:"
    },
    {
        "key": "gift",
        "unicode": "1f381",
        "name": "wrapped present",
        "shortname": ":gift:"
    },
    {
        "key": "confetti_ball",
        "unicode": "1f38a",
        "name": "confetti ball",
        "shortname": ":confetti_ball:"
    },
    {
        "key": "tada",
        "unicode": "1f389",
        "name": "party popper",
        "shortname": ":tada:"
    },
    {
        "key": "dolls",
        "unicode": "1f38e",
        "name": "japanese dolls",
        "shortname": ":dolls:"
    },
    {
        "key": "wind_chime",
        "unicode": "1f390",
        "name": "wind chime",
        "shortname": ":wind_chime:"
    },
    {
        "key": "crossed_flags",
        "unicode": "1f38c",
        "name": "crossed flags",
        "shortname": ":crossed_flags:"
    },
    {
        "key": "izakaya_lantern",
        "unicode": "1f3ee",
        "name": "izakaya lantern",
        "shortname": ":izakaya_lantern:"
    },
    {
        "key": "envelope",
        "unicode": "2709",
        "name": "envelope",
        "shortname": ":envelope:"
    },
    {
        "key": "envelope_with_arrow",
        "unicode": "1f4e9",
        "name": "envelope with downwards arrow above",
        "shortname": ":envelope_with_arrow:"
    },
    {
        "key": "incoming_envelope",
        "unicode": "1f4e8",
        "name": "incoming envelope",
        "shortname": ":incoming_envelope:"
    },
    {
        "key": "e-mail",
        "unicode": "1f4e7",
        "name": "e-mail symbol",
        "shortname": ":e-mail:"
    },
    {
        "key": "love_letter",
        "unicode": "1f48c",
        "name": "love letter",
        "shortname": ":love_letter:"
    },
    {
        "key": "postbox",
        "unicode": "1f4ee",
        "name": "postbox",
        "shortname": ":postbox:"
    },
    {
        "key": "mailbox_closed",
        "unicode": "1f4ea",
        "name": "closed mailbox with lowered flag",
        "shortname": ":mailbox_closed:"
    },
    {
        "key": "mailbox",
        "unicode": "1f4eb",
        "name": "closed mailbox with raised flag",
        "shortname": ":mailbox:"
    },
    {
        "key": "mailbox_with_mail",
        "unicode": "1f4ec",
        "name": "open mailbox with raised flag",
        "shortname": ":mailbox_with_mail:"
    },
    {
        "key": "mailbox_with_no_mail",
        "unicode": "1f4ed",
        "name": "open mailbox with lowered flag",
        "shortname": ":mailbox_with_no_mail:"
    },
    {
        "key": "package",
        "unicode": "1f4e6",
        "name": "package",
        "shortname": ":package:"
    },
    {
        "key": "postal_horn",
        "unicode": "1f4ef",
        "name": "postal horn",
        "shortname": ":postal_horn:"
    },
    {
        "key": "inbox_tray",
        "unicode": "1f4e5",
        "name": "inbox tray",
        "shortname": ":inbox_tray:"
    },
    {
        "key": "outbox_tray",
        "unicode": "1f4e4",
        "name": "outbox tray",
        "shortname": ":outbox_tray:"
    },
    {
        "key": "scroll",
        "unicode": "1f4dc",
        "name": "scroll",
        "shortname": ":scroll:"
    },
    {
        "key": "page_with_curl",
        "unicode": "1f4c3",
        "name": "page with curl",
        "shortname": ":page_with_curl:"
    },
    {
        "key": "bookmark_tabs",
        "unicode": "1f4d1",
        "name": "bookmark tabs",
        "shortname": ":bookmark_tabs:"
    },
    {
        "key": "bar_chart",
        "unicode": "1f4ca",
        "name": "bar chart",
        "shortname": ":bar_chart:"
    },
    {
        "key": "chart_with_upwards_trend",
        "unicode": "1f4c8",
        "name": "chart with upwards trend",
        "shortname": ":chart_with_upwards_trend:"
    },
    {
        "key": "chart_with_downwards_trend",
        "unicode": "1f4c9",
        "name": "chart with downwards trend",
        "shortname": ":chart_with_downwards_trend:"
    },
    {
        "key": "page_facing_up",
        "unicode": "1f4c4",
        "name": "page facing up",
        "shortname": ":page_facing_up:"
    },
    {
        "key": "date",
        "unicode": "1f4c5",
        "name": "calendar",
        "shortname": ":date:"
    },
    {
        "key": "calendar",
        "unicode": "1f4c6",
        "name": "tear-off calendar",
        "shortname": ":calendar:"
    },
    {
        "key": "calendar_spiral",
        "unicode": "1f5d3",
        "name": "spiral calendar pad",
        "shortname": ":calendar_spiral:"
    },
    {
        "key": "card_index",
        "unicode": "1f4c7",
        "name": "card index",
        "shortname": ":card_index:"
    },
    {
        "key": "card_box",
        "unicode": "1f5c3",
        "name": "card file box",
        "shortname": ":card_box:"
    },
    {
        "key": "ballot_box",
        "unicode": "1f5f3",
        "name": "ballot box with ballot",
        "shortname": ":ballot_box:"
    },
    {
        "key": "file_cabinet",
        "unicode": "1f5c4",
        "name": "file cabinet",
        "shortname": ":file_cabinet:"
    },
    {
        "key": "clipboard",
        "unicode": "1f4cb",
        "name": "clipboard",
        "shortname": ":clipboard:"
    },
    {
        "key": "notepad_spiral",
        "unicode": "1f5d2",
        "name": "spiral note pad",
        "shortname": ":notepad_spiral:"
    },
    {
        "key": "file_folder",
        "unicode": "1f4c1",
        "name": "file folder",
        "shortname": ":file_folder:"
    },
    {
        "key": "open_file_folder",
        "unicode": "1f4c2",
        "name": "open file folder",
        "shortname": ":open_file_folder:"
    },
    {
        "key": "dividers",
        "unicode": "1f5c2",
        "name": "card index dividers",
        "shortname": ":dividers:"
    },
    {
        "key": "newspaper2",
        "unicode": "1f5de",
        "name": "rolled-up newspaper",
        "shortname": ":newspaper2:"
    },
    {
        "key": "newspaper",
        "unicode": "1f4f0",
        "name": "newspaper",
        "shortname": ":newspaper:"
    },
    {
        "key": "notebook",
        "unicode": "1f4d3",
        "name": "notebook",
        "shortname": ":notebook:"
    },
    {
        "key": "closed_book",
        "unicode": "1f4d5",
        "name": "closed book",
        "shortname": ":closed_book:"
    },
    {
        "key": "green_book",
        "unicode": "1f4d7",
        "name": "green book",
        "shortname": ":green_book:"
    },
    {
        "key": "blue_book",
        "unicode": "1f4d8",
        "name": "blue book",
        "shortname": ":blue_book:"
    },
    {
        "key": "orange_book",
        "unicode": "1f4d9",
        "name": "orange book",
        "shortname": ":orange_book:"
    },
    {
        "key": "notebook_with_decorative_cover",
        "unicode": "1f4d4",
        "name": "notebook with decorative cover",
        "shortname": ":notebook_with_decorative_cover:"
    },
    {
        "key": "ledger",
        "unicode": "1f4d2",
        "name": "ledger",
        "shortname": ":ledger:"
    },
    {
        "key": "books",
        "unicode": "1f4da",
        "name": "books",
        "shortname": ":books:"
    },
    {
        "key": "book",
        "unicode": "1f4d6",
        "name": "open book",
        "shortname": ":book:"
    },
    {
        "key": "link",
        "unicode": "1f517",
        "name": "link symbol",
        "shortname": ":link:"
    },
    {
        "key": "paperclip",
        "unicode": "1f4ce",
        "name": "paperclip",
        "shortname": ":paperclip:"
    },
    {
        "key": "paperclips",
        "unicode": "1f587",
        "name": "linked paperclips",
        "shortname": ":paperclips:"
    },
    {
        "key": "scissors",
        "unicode": "2702",
        "name": "black scissors",
        "shortname": ":scissors:"
    },
    {
        "key": "triangular_ruler",
        "unicode": "1f4d0",
        "name": "triangular ruler",
        "shortname": ":triangular_ruler:"
    },
    {
        "key": "straight_ruler",
        "unicode": "1f4cf",
        "name": "straight ruler",
        "shortname": ":straight_ruler:"
    },
    {
        "key": "pushpin",
        "unicode": "1f4cc",
        "name": "pushpin",
        "shortname": ":pushpin:"
    },
    {
        "key": "round_pushpin",
        "unicode": "1f4cd",
        "name": "round pushpin",
        "shortname": ":round_pushpin:"
    },
    {
        "key": "triangular_flag_on_post",
        "unicode": "1f6a9",
        "name": "triangular flag on post",
        "shortname": ":triangular_flag_on_post:"
    },
    {
        "key": "flag_white",
        "unicode": "1f3f3",
        "name": "waving white flag",
        "shortname": ":flag_white:"
    },
    {
        "key": "flag_black",
        "unicode": "1f3f4",
        "name": "waving black flag",
        "shortname": ":flag_black:"
    },
    {
        "key": "closed_lock_with_key",
        "unicode": "1f510",
        "name": "closed lock with key",
        "shortname": ":closed_lock_with_key:"
    },
    {
        "key": "lock",
        "unicode": "1f512",
        "name": "lock",
        "shortname": ":lock:"
    },
    {
        "key": "unlock",
        "unicode": "1f513",
        "name": "open lock",
        "shortname": ":unlock:"
    },
    {
        "key": "lock_with_ink_pen",
        "unicode": "1f50f",
        "name": "lock with ink pen",
        "shortname": ":lock_with_ink_pen:"
    },
    {
        "key": "pen_ballpoint",
        "unicode": "1f58a",
        "name": "lower left ballpoint pen",
        "shortname": ":pen_ballpoint:"
    },
    {
        "key": "pen_fountain",
        "unicode": "1f58b",
        "name": "lower left fountain pen",
        "shortname": ":pen_fountain:"
    },
    {
        "key": "black_nib",
        "unicode": "2712",
        "name": "black nib",
        "shortname": ":black_nib:"
    },
    {
        "key": "pencil",
        "unicode": "1f4dd",
        "name": "memo",
        "shortname": ":pencil:"
    },
    {
        "key": "pencil2",
        "unicode": "270f",
        "name": "pencil",
        "shortname": ":pencil2:"
    },
    {
        "key": "crayon",
        "unicode": "1f58d",
        "name": "lower left crayon",
        "shortname": ":crayon:"
    },
    {
        "key": "paintbrush",
        "unicode": "1f58c",
        "name": "lower left paintbrush",
        "shortname": ":paintbrush:"
    },
    {
        "key": "mag",
        "unicode": "1f50d",
        "name": "left-pointing magnifying glass",
        "shortname": ":mag:"
    },
    {
        "key": "mag_right",
        "unicode": "1f50e",
        "name": "right-pointing magnifying glass",
        "shortname": ":mag_right:"
    },
    {
        "key": "heart",
        "unicode": "2764",
        "name": "heavy black heart",
        "shortname": ":heart:"
    },
    {
        "key": "yellow_heart",
        "unicode": "1f49b",
        "name": "yellow heart",
        "shortname": ":yellow_heart:"
    },
    {
        "key": "green_heart",
        "unicode": "1f49a",
        "name": "green heart",
        "shortname": ":green_heart:"
    },
    {
        "key": "blue_heart",
        "unicode": "1f499",
        "name": "blue heart",
        "shortname": ":blue_heart:"
    },
    {
        "key": "purple_heart",
        "unicode": "1f49c",
        "name": "purple heart",
        "shortname": ":purple_heart:"
    },
    {
        "key": "broken_heart",
        "unicode": "1f494",
        "name": "broken heart",
        "shortname": ":broken_heart:"
    },
    {
        "key": "heart_exclamation",
        "unicode": "2763",
        "name": "heavy heart exclamation mark ornament",
        "shortname": ":heart_exclamation:"
    },
    {
        "key": "two_hearts",
        "unicode": "1f495",
        "name": "two hearts",
        "shortname": ":two_hearts:"
    },
    {
        "key": "revolving_hearts",
        "unicode": "1f49e",
        "name": "revolving hearts",
        "shortname": ":revolving_hearts:"
    },
    {
        "key": "heartbeat",
        "unicode": "1f493",
        "name": "beating heart",
        "shortname": ":heartbeat:"
    },
    {
        "key": "heartpulse",
        "unicode": "1f497",
        "name": "growing heart",
        "shortname": ":heartpulse:"
    },
    {
        "key": "sparkling_heart",
        "unicode": "1f496",
        "name": "sparkling heart",
        "shortname": ":sparkling_heart:"
    },
    {
        "key": "cupid",
        "unicode": "1f498",
        "name": "heart with arrow",
        "shortname": ":cupid:"
    },
    {
        "key": "gift_heart",
        "unicode": "1f49d",
        "name": "heart with ribbon",
        "shortname": ":gift_heart:"
    },
    {
        "key": "heart_decoration",
        "unicode": "1f49f",
        "name": "heart decoration",
        "shortname": ":heart_decoration:"
    },
    {
        "key": "peace",
        "unicode": "262e",
        "name": "peace symbol",
        "shortname": ":peace:"
    },
    {
        "key": "cross",
        "unicode": "271d",
        "name": "latin cross",
        "shortname": ":cross:"
    },
    {
        "key": "star_and_crescent",
        "unicode": "262a",
        "name": "star and crescent",
        "shortname": ":star_and_crescent:"
    },
    {
        "key": "om_symbol",
        "unicode": "1f549",
        "name": "om symbol",
        "shortname": ":om_symbol:"
    },
    {
        "key": "wheel_of_dharma",
        "unicode": "2638",
        "name": "wheel of dharma",
        "shortname": ":wheel_of_dharma:"
    },
    {
        "key": "star_of_david",
        "unicode": "2721",
        "name": "star of david",
        "shortname": ":star_of_david:"
    },
    {
        "key": "six_pointed_star",
        "unicode": "1f52f",
        "name": "six pointed star with middle dot",
        "shortname": ":six_pointed_star:"
    },
    {
        "key": "menorah",
        "unicode": "1f54e",
        "name": "menorah with nine branches",
        "shortname": ":menorah:"
    },
    {
        "key": "yin_yang",
        "unicode": "262f",
        "name": "yin yang",
        "shortname": ":yin_yang:"
    },
    {
        "key": "orthodox_cross",
        "unicode": "2626",
        "name": "orthodox cross",
        "shortname": ":orthodox_cross:"
    },
    {
        "key": "place_of_worship",
        "unicode": "1f6d0",
        "name": "place of worship",
        "shortname": ":place_of_worship:"
    },
    {
        "key": "ophiuchus",
        "unicode": "26ce",
        "name": "ophiuchus",
        "shortname": ":ophiuchus:"
    },
    {
        "key": "aries",
        "unicode": "2648",
        "name": "aries",
        "shortname": ":aries:"
    },
    {
        "key": "taurus",
        "unicode": "2649",
        "name": "taurus",
        "shortname": ":taurus:"
    },
    {
        "key": "gemini",
        "unicode": "264a",
        "name": "gemini",
        "shortname": ":gemini:"
    },
    {
        "key": "cancer",
        "unicode": "264b",
        "name": "cancer",
        "shortname": ":cancer:"
    },
    {
        "key": "leo",
        "unicode": "264c",
        "name": "leo",
        "shortname": ":leo:"
    },
    {
        "key": "virgo",
        "unicode": "264d",
        "name": "virgo",
        "shortname": ":virgo:"
    },
    {
        "key": "libra",
        "unicode": "264e",
        "name": "libra",
        "shortname": ":libra:"
    },
    {
        "key": "scorpius",
        "unicode": "264f",
        "name": "scorpius",
        "shortname": ":scorpius:"
    },
    {
        "key": "sagittarius",
        "unicode": "2650",
        "name": "sagittarius",
        "shortname": ":sagittarius:"
    },
    {
        "key": "capricorn",
        "unicode": "2651",
        "name": "capricorn",
        "shortname": ":capricorn:"
    },
    {
        "key": "aquarius",
        "unicode": "2652",
        "name": "aquarius",
        "shortname": ":aquarius:"
    },
    {
        "key": "pisces",
        "unicode": "2653",
        "name": "pisces",
        "shortname": ":pisces:"
    },
    {
        "key": "id",
        "unicode": "1f194",
        "name": "squared id",
        "shortname": ":id:"
    },
    {
        "key": "atom",
        "unicode": "269b",
        "name": "atom symbol",
        "shortname": ":atom:"
    },
    {
        "key": "u7a7a",
        "unicode": "1f233",
        "name": "squared cjk unified ideograph-7a7a",
        "shortname": ":u7a7a:"
    },
    {
        "key": "u5272",
        "unicode": "1f239",
        "name": "squared cjk unified ideograph-5272",
        "shortname": ":u5272:"
    },
    {
        "key": "radioactive",
        "unicode": "2622",
        "name": "radioactive sign",
        "shortname": ":radioactive:"
    },
    {
        "key": "biohazard",
        "unicode": "2623",
        "name": "biohazard sign",
        "shortname": ":biohazard:"
    },
    {
        "key": "mobile_phone_off",
        "unicode": "1f4f4",
        "name": "mobile phone off",
        "shortname": ":mobile_phone_off:"
    },
    {
        "key": "vibration_mode",
        "unicode": "1f4f3",
        "name": "vibration mode",
        "shortname": ":vibration_mode:"
    },
    {
        "key": "u6709",
        "unicode": "1f236",
        "name": "squared cjk unified ideograph-6709",
        "shortname": ":u6709:"
    },
    {
        "key": "u7121",
        "unicode": "1f21a",
        "name": "squared cjk unified ideograph-7121",
        "shortname": ":u7121:"
    },
    {
        "key": "u7533",
        "unicode": "1f238",
        "name": "squared cjk unified ideograph-7533",
        "shortname": ":u7533:"
    },
    {
        "key": "u55b6",
        "unicode": "1f23a",
        "name": "squared cjk unified ideograph-55b6",
        "shortname": ":u55b6:"
    },
    {
        "key": "u6708",
        "unicode": "1f237",
        "name": "squared cjk unified ideograph-6708",
        "shortname": ":u6708:"
    },
    {
        "key": "eight_pointed_black_star",
        "unicode": "2734",
        "name": "eight pointed black star",
        "shortname": ":eight_pointed_black_star:"
    },
    {
        "key": "vs",
        "unicode": "1f19a",
        "name": "squared vs",
        "shortname": ":vs:"
    },
    {
        "key": "accept",
        "unicode": "1f251",
        "name": "circled ideograph accept",
        "shortname": ":accept:"
    },
    {
        "key": "white_flower",
        "unicode": "1f4ae",
        "name": "white flower",
        "shortname": ":white_flower:"
    },
    {
        "key": "ideograph_advantage",
        "unicode": "1f250",
        "name": "circled ideograph advantage",
        "shortname": ":ideograph_advantage:"
    },
    {
        "key": "secret",
        "unicode": "3299",
        "name": "circled ideograph secret",
        "shortname": ":secret:"
    },
    {
        "key": "congratulations",
        "unicode": "3297",
        "name": "circled ideograph congratulation",
        "shortname": ":congratulations:"
    },
    {
        "key": "u5408",
        "unicode": "1f234",
        "name": "squared cjk unified ideograph-5408",
        "shortname": ":u5408:"
    },
    {
        "key": "u6e80",
        "unicode": "1f235",
        "name": "squared cjk unified ideograph-6e80",
        "shortname": ":u6e80:"
    },
    {
        "key": "u7981",
        "unicode": "1f232",
        "name": "squared cjk unified ideograph-7981",
        "shortname": ":u7981:"
    },
    {
        "key": "a",
        "unicode": "1f170",
        "name": "negative squared latin capital letter a",
        "shortname": ":a:"
    },
    {
        "key": "b",
        "unicode": "1f171",
        "name": "negative squared latin capital letter b",
        "shortname": ":b:"
    },
    {
        "key": "ab",
        "unicode": "1f18e",
        "name": "negative squared ab",
        "shortname": ":ab:"
    },
    {
        "key": "cl",
        "unicode": "1f191",
        "name": "squared cl",
        "shortname": ":cl:"
    },
    {
        "key": "o2",
        "unicode": "1f17e",
        "name": "negative squared latin capital letter o",
        "shortname": ":o2:"
    },
    {
        "key": "sos",
        "unicode": "1f198",
        "name": "squared sos",
        "shortname": ":sos:"
    },
    {
        "key": "no_entry",
        "unicode": "26d4",
        "name": "no entry",
        "shortname": ":no_entry:"
    },
    {
        "key": "name_badge",
        "unicode": "1f4db",
        "name": "name badge",
        "shortname": ":name_badge:"
    },
    {
        "key": "no_entry_sign",
        "unicode": "1f6ab",
        "name": "no entry sign",
        "shortname": ":no_entry_sign:"
    },
    {
        "key": "x",
        "unicode": "274c",
        "name": "cross mark",
        "shortname": ":x:"
    },
    {
        "key": "o",
        "unicode": "2b55",
        "name": "heavy large circle",
        "shortname": ":o:"
    },
    {
        "key": "anger",
        "unicode": "1f4a2",
        "name": "anger symbol",
        "shortname": ":anger:"
    },
    {
        "key": "hotsprings",
        "unicode": "2668",
        "name": "hot springs",
        "shortname": ":hotsprings:"
    },
    {
        "key": "no_pedestrians",
        "unicode": "1f6b7",
        "name": "no pedestrians",
        "shortname": ":no_pedestrians:"
    },
    {
        "key": "do_not_litter",
        "unicode": "1f6af",
        "name": "do not litter symbol",
        "shortname": ":do_not_litter:"
    },
    {
        "key": "no_bicycles",
        "unicode": "1f6b3",
        "name": "no bicycles",
        "shortname": ":no_bicycles:"
    },
    {
        "key": "non-potable_water",
        "unicode": "1f6b1",
        "name": "non-potable water symbol",
        "shortname": ":non-potable_water:"
    },
    {
        "key": "underage",
        "unicode": "1f51e",
        "name": "no one under eighteen symbol",
        "shortname": ":underage:"
    },
    {
        "key": "no_mobile_phones",
        "unicode": "1f4f5",
        "name": "no mobile phones",
        "shortname": ":no_mobile_phones:"
    },
    {
        "key": "exclamation",
        "unicode": "2757",
        "name": "heavy exclamation mark symbol",
        "shortname": ":exclamation:"
    },
    {
        "key": "grey_exclamation",
        "unicode": "2755",
        "name": "white exclamation mark ornament",
        "shortname": ":grey_exclamation:"
    },
    {
        "key": "question",
        "unicode": "2753",
        "name": "black question mark ornament",
        "shortname": ":question:"
    },
    {
        "key": "grey_question",
        "unicode": "2754",
        "name": "white question mark ornament",
        "shortname": ":grey_question:"
    },
    {
        "key": "bangbang",
        "unicode": "203c",
        "name": "double exclamation mark",
        "shortname": ":bangbang:"
    },
    {
        "key": "interrobang",
        "unicode": "2049",
        "name": "exclamation question mark",
        "shortname": ":interrobang:"
    },
    {
        "key": "low_brightness",
        "unicode": "1f505",
        "name": "low brightness symbol",
        "shortname": ":low_brightness:"
    },
    {
        "key": "high_brightness",
        "unicode": "1f506",
        "name": "high brightness symbol",
        "shortname": ":high_brightness:"
    },
    {
        "key": "trident",
        "unicode": "1f531",
        "name": "trident emblem",
        "shortname": ":trident:"
    },
    {
        "key": "fleur-de-lis",
        "unicode": "269c",
        "name": "fleur-de-lis",
        "shortname": ":fleur-de-lis:"
    },
    {
        "key": "part_alternation_mark",
        "unicode": "303d",
        "name": "part alternation mark",
        "shortname": ":part_alternation_mark:"
    },
    {
        "key": "warning",
        "unicode": "26a0",
        "name": "warning sign",
        "shortname": ":warning:"
    },
    {
        "key": "children_crossing",
        "unicode": "1f6b8",
        "name": "children crossing",
        "shortname": ":children_crossing:"
    },
    {
        "key": "beginner",
        "unicode": "1f530",
        "name": "japanese symbol for beginner",
        "shortname": ":beginner:"
    },
    {
        "key": "recycle",
        "unicode": "267b",
        "name": "black universal recycling symbol",
        "shortname": ":recycle:"
    },
    {
        "key": "u6307",
        "unicode": "1f22f",
        "name": "squared cjk unified ideograph-6307",
        "shortname": ":u6307:"
    },
    {
        "key": "chart",
        "unicode": "1f4b9",
        "name": "chart with upwards trend and yen sign",
        "shortname": ":chart:"
    },
    {
        "key": "sparkle",
        "unicode": "2747",
        "name": "sparkle",
        "shortname": ":sparkle:"
    },
    {
        "key": "eight_spoked_asterisk",
        "unicode": "2733",
        "name": "eight spoked asterisk",
        "shortname": ":eight_spoked_asterisk:"
    },
    {
        "key": "negative_squared_cross_mark",
        "unicode": "274e",
        "name": "negative squared cross mark",
        "shortname": ":negative_squared_cross_mark:"
    },
    {
        "key": "white_check_mark",
        "unicode": "2705",
        "name": "white heavy check mark",
        "shortname": ":white_check_mark:"
    },
    {
        "key": "diamond_shape_with_a_dot_inside",
        "unicode": "1f4a0",
        "name": "diamond shape with a dot inside",
        "shortname": ":diamond_shape_with_a_dot_inside:"
    },
    {
        "key": "cyclone",
        "unicode": "1f300",
        "name": "cyclone",
        "shortname": ":cyclone:"
    },
    {
        "key": "loop",
        "unicode": "27bf",
        "name": "double curly loop",
        "shortname": ":loop:"
    },
    {
        "key": "globe_with_meridians",
        "unicode": "1f310",
        "name": "globe with meridians",
        "shortname": ":globe_with_meridians:"
    },
    {
        "key": "m",
        "unicode": "24c2",
        "name": "circled latin capital letter m",
        "shortname": ":m:"
    },
    {
        "key": "atm",
        "unicode": "1f3e7",
        "name": "automated teller machine",
        "shortname": ":atm:"
    },
    {
        "key": "sa",
        "unicode": "1f202",
        "name": "squared katakana sa",
        "shortname": ":sa:"
    },
    {
        "key": "passport_control",
        "unicode": "1f6c2",
        "name": "passport control",
        "shortname": ":passport_control:"
    },
    {
        "key": "customs",
        "unicode": "1f6c3",
        "name": "customs",
        "shortname": ":customs:"
    },
    {
        "key": "baggage_claim",
        "unicode": "1f6c4",
        "name": "baggage claim",
        "shortname": ":baggage_claim:"
    },
    {
        "key": "left_luggage",
        "unicode": "1f6c5",
        "name": "left luggage",
        "shortname": ":left_luggage:"
    },
    {
        "key": "wheelchair",
        "unicode": "267f",
        "name": "wheelchair symbol",
        "shortname": ":wheelchair:"
    },
    {
        "key": "no_smoking",
        "unicode": "1f6ad",
        "name": "no smoking symbol",
        "shortname": ":no_smoking:"
    },
    {
        "key": "wc",
        "unicode": "1f6be",
        "name": "water closet",
        "shortname": ":wc:"
    },
    {
        "key": "parking",
        "unicode": "1f17f",
        "name": "negative squared latin capital letter p",
        "shortname": ":parking:"
    },
    {
        "key": "potable_water",
        "unicode": "1f6b0",
        "name": "potable water symbol",
        "shortname": ":potable_water:"
    },
    {
        "key": "mens",
        "unicode": "1f6b9",
        "name": "mens symbol",
        "shortname": ":mens:"
    },
    {
        "key": "womens",
        "unicode": "1f6ba",
        "name": "womens symbol",
        "shortname": ":womens:"
    },
    {
        "key": "baby_symbol",
        "unicode": "1f6bc",
        "name": "baby symbol",
        "shortname": ":baby_symbol:"
    },
    {
        "key": "restroom",
        "unicode": "1f6bb",
        "name": "restroom",
        "shortname": ":restroom:"
    },
    {
        "key": "put_litter_in_its_place",
        "unicode": "1f6ae",
        "name": "put litter in its place symbol",
        "shortname": ":put_litter_in_its_place:"
    },
    {
        "key": "cinema",
        "unicode": "1f3a6",
        "name": "cinema",
        "shortname": ":cinema:"
    },
    {
        "key": "signal_strength",
        "unicode": "1f4f6",
        "name": "antenna with bars",
        "shortname": ":signal_strength:"
    },
    {
        "key": "koko",
        "unicode": "1f201",
        "name": "squared katakana koko",
        "shortname": ":koko:"
    },
    {
        "key": "ng",
        "unicode": "1f196",
        "name": "squared ng",
        "shortname": ":ng:"
    },
    {
        "key": "ok",
        "unicode": "1f197",
        "name": "squared ok",
        "shortname": ":ok:"
    },
    {
        "key": "up",
        "unicode": "1f199",
        "name": "squared up with exclamation mark",
        "shortname": ":up:"
    },
    {
        "key": "cool",
        "unicode": "1f192",
        "name": "squared cool",
        "shortname": ":cool:"
    },
    {
        "key": "new",
        "unicode": "1f195",
        "name": "squared new",
        "shortname": ":new:"
    },
    {
        "key": "free",
        "unicode": "1f193",
        "name": "squared free",
        "shortname": ":free:"
    },
    {
        "key": "zero",
        "unicode": "0030-20e3",
        "name": "keycap digit zero",
        "shortname": ":zero:"
    },
    {
        "key": "one",
        "unicode": "0031-20e3",
        "name": "keycap digit one",
        "shortname": ":one:"
    },
    {
        "key": "two",
        "unicode": "0032-20e3",
        "name": "keycap digit two",
        "shortname": ":two:"
    },
    {
        "key": "three",
        "unicode": "0033-20e3",
        "name": "keycap digit three",
        "shortname": ":three:"
    },
    {
        "key": "four",
        "unicode": "0034-20e3",
        "name": "keycap digit four",
        "shortname": ":four:"
    },
    {
        "key": "five",
        "unicode": "0035-20e3",
        "name": "keycap digit five",
        "shortname": ":five:"
    },
    {
        "key": "six",
        "unicode": "0036-20e3",
        "name": "keycap digit six",
        "shortname": ":six:"
    },
    {
        "key": "seven",
        "unicode": "0037-20e3",
        "name": "keycap digit seven",
        "shortname": ":seven:"
    },
    {
        "key": "eight",
        "unicode": "0038-20e3",
        "name": "keycap digit eight",
        "shortname": ":eight:"
    },
    {
        "key": "nine",
        "unicode": "0039-20e3",
        "name": "keycap digit nine",
        "shortname": ":nine:"
    },
    {
        "key": "ten",
        "unicode": "1f51f",
        "name": "keycap ten",
        "shortname": ":ten:"
    },
    {
        "key": "arrow_forward",
        "unicode": "25b6",
        "name": "black right-pointing triangle",
        "shortname": ":arrow_forward:"
    },
    {
        "key": "pause_button",
        "unicode": "23f8",
        "name": "double vertical bar",
        "shortname": ":pause_button:"
    },
    {
        "key": "play_pause",
        "unicode": "23ef",
        "name": "black right-pointing double triangle with double vertical bar",
        "shortname": ":play_pause:"
    },
    {
        "key": "stop_button",
        "unicode": "23f9",
        "name": "black square for stop",
        "shortname": ":stop_button:"
    },
    {
        "key": "record_button",
        "unicode": "23fa",
        "name": "black circle for record",
        "shortname": ":record_button:"
    },
    {
        "key": "track_next",
        "unicode": "23ed",
        "name": "black right-pointing double triangle with vertical bar",
        "shortname": ":track_next:"
    },
    {
        "key": "track_previous",
        "unicode": "23ee",
        "name": "black left-pointing double triangle with vertical bar",
        "shortname": ":track_previous:"
    },
    {
        "key": "fast_forward",
        "unicode": "23e9",
        "name": "black right-pointing double triangle",
        "shortname": ":fast_forward:"
    },
    {
        "key": "rewind",
        "unicode": "23ea",
        "name": "black left-pointing double triangle",
        "shortname": ":rewind:"
    },
    {
        "key": "twisted_rightwards_arrows",
        "unicode": "1f500",
        "name": "twisted rightwards arrows",
        "shortname": ":twisted_rightwards_arrows:"
    },
    {
        "key": "repeat",
        "unicode": "1f501",
        "name": "clockwise rightwards and leftwards open circle arrows",
        "shortname": ":repeat:"
    },
    {
        "key": "repeat_one",
        "unicode": "1f502",
        "name": "clockwise rightwards and leftwards open circle arrows with circled one overlay",
        "shortname": ":repeat_one:"
    },
    {
        "key": "arrow_backward",
        "unicode": "25c0",
        "name": "black left-pointing triangle",
        "shortname": ":arrow_backward:"
    },
    {
        "key": "arrow_up_small",
        "unicode": "1f53c",
        "name": "up-pointing small red triangle",
        "shortname": ":arrow_up_small:"
    },
    {
        "key": "arrow_down_small",
        "unicode": "1f53d",
        "name": "down-pointing small red triangle",
        "shortname": ":arrow_down_small:"
    },
    {
        "key": "arrow_double_up",
        "unicode": "23eb",
        "name": "black up-pointing double triangle",
        "shortname": ":arrow_double_up:"
    },
    {
        "key": "arrow_double_down",
        "unicode": "23ec",
        "name": "black down-pointing double triangle",
        "shortname": ":arrow_double_down:"
    },
    {
        "key": "arrow_right",
        "unicode": "27a1",
        "name": "black rightwards arrow",
        "shortname": ":arrow_right:"
    },
    {
        "key": "arrow_left",
        "unicode": "2b05",
        "name": "leftwards black arrow",
        "shortname": ":arrow_left:"
    },
    {
        "key": "arrow_up",
        "unicode": "2b06",
        "name": "upwards black arrow",
        "shortname": ":arrow_up:"
    },
    {
        "key": "arrow_down",
        "unicode": "2b07",
        "name": "downwards black arrow",
        "shortname": ":arrow_down:"
    },
    {
        "key": "arrow_upper_right",
        "unicode": "2197",
        "name": "north east arrow",
        "shortname": ":arrow_upper_right:"
    },
    {
        "key": "arrow_lower_right",
        "unicode": "2198",
        "name": "south east arrow",
        "shortname": ":arrow_lower_right:"
    },
    {
        "key": "arrow_lower_left",
        "unicode": "2199",
        "name": "south west arrow",
        "shortname": ":arrow_lower_left:"
    },
    {
        "key": "arrow_upper_left",
        "unicode": "2196",
        "name": "north west arrow",
        "shortname": ":arrow_upper_left:"
    },
    {
        "key": "arrow_up_down",
        "unicode": "2195",
        "name": "up down arrow",
        "shortname": ":arrow_up_down:"
    },
    {
        "key": "left_right_arrow",
        "unicode": "2194",
        "name": "left right arrow",
        "shortname": ":left_right_arrow:"
    },
    {
        "key": "arrows_counterclockwise",
        "unicode": "1f504",
        "name": "anticlockwise downwards and upwards open circle arrows",
        "shortname": ":arrows_counterclockwise:"
    },
    {
        "key": "arrow_right_hook",
        "unicode": "21aa",
        "name": "rightwards arrow with hook",
        "shortname": ":arrow_right_hook:"
    },
    {
        "key": "leftwards_arrow_with_hook",
        "unicode": "21a9",
        "name": "leftwards arrow with hook",
        "shortname": ":leftwards_arrow_with_hook:"
    },
    {
        "key": "arrow_heading_up",
        "unicode": "2934",
        "name": "arrow pointing rightwards then curving upwards",
        "shortname": ":arrow_heading_up:"
    },
    {
        "key": "arrow_heading_down",
        "unicode": "2935",
        "name": "arrow pointing rightwards then curving downwards",
        "shortname": ":arrow_heading_down:"
    },
    {
        "key": "hash",
        "unicode": "0023-20e3",
        "name": "keycap number sign",
        "shortname": ":hash:"
    },
    {
        "key": "asterisk",
        "unicode": "002a-20e3",
        "name": "keycap asterisk",
        "shortname": ":asterisk:"
    },
    {
        "key": "information_source",
        "unicode": "2139",
        "name": "information source",
        "shortname": ":information_source:"
    },
    {
        "key": "abc",
        "unicode": "1f524",
        "name": "input symbol for latin letters",
        "shortname": ":abc:"
    },
    {
        "key": "abcd",
        "unicode": "1f521",
        "name": "input symbol for latin small letters",
        "shortname": ":abcd:"
    },
    {
        "key": "capital_abcd",
        "unicode": "1f520",
        "name": "input symbol for latin capital letters",
        "shortname": ":capital_abcd:"
    },
    {
        "key": "symbols",
        "unicode": "1f523",
        "name": "input symbol for symbols",
        "shortname": ":symbols:"
    },
    {
        "key": "musical_note",
        "unicode": "1f3b5",
        "name": "musical note",
        "shortname": ":musical_note:"
    },
    {
        "key": "notes",
        "unicode": "1f3b6",
        "name": "multiple musical notes",
        "shortname": ":notes:"
    },
    {
        "key": "wavy_dash",
        "unicode": "3030",
        "name": "wavy dash",
        "shortname": ":wavy_dash:"
    },
    {
        "key": "curly_loop",
        "unicode": "27b0",
        "name": "curly loop",
        "shortname": ":curly_loop:"
    },
    {
        "key": "heavy_check_mark",
        "unicode": "2714",
        "name": "heavy check mark",
        "shortname": ":heavy_check_mark:"
    },
    {
        "key": "arrows_clockwise",
        "unicode": "1f503",
        "name": "clockwise downwards and upwards open circle arrows",
        "shortname": ":arrows_clockwise:"
    },
    {
        "key": "heavy_plus_sign",
        "unicode": "2795",
        "name": "heavy plus sign",
        "shortname": ":heavy_plus_sign:"
    },
    {
        "key": "heavy_minus_sign",
        "unicode": "2796",
        "name": "heavy minus sign",
        "shortname": ":heavy_minus_sign:"
    },
    {
        "key": "heavy_division_sign",
        "unicode": "2797",
        "name": "heavy division sign",
        "shortname": ":heavy_division_sign:"
    },
    {
        "key": "heavy_multiplication_x",
        "unicode": "2716",
        "name": "heavy multiplication x",
        "shortname": ":heavy_multiplication_x:"
    },
    {
        "key": "heavy_dollar_sign",
        "unicode": "1f4b2",
        "name": "heavy dollar sign",
        "shortname": ":heavy_dollar_sign:"
    },
    {
        "key": "currency_exchange",
        "unicode": "1f4b1",
        "name": "currency exchange",
        "shortname": ":currency_exchange:"
    },
    {
        "key": "copyright",
        "unicode": "00a9",
        "name": "copyright sign",
        "shortname": ":copyright:"
    },
    {
        "key": "registered",
        "unicode": "00ae",
        "name": "registered sign",
        "shortname": ":registered:"
    },
    {
        "key": "tm",
        "unicode": "2122",
        "name": "trade mark sign",
        "shortname": ":tm:"
    },
    {
        "key": "end",
        "unicode": "1f51a",
        "name": "end with leftwards arrow above",
        "shortname": ":end:"
    },
    {
        "key": "back",
        "unicode": "1f519",
        "name": "back with leftwards arrow above",
        "shortname": ":back:"
    },
    {
        "key": "on",
        "unicode": "1f51b",
        "name": "on with exclamation mark with left right arrow abo",
        "shortname": ":on:"
    },
    {
        "key": "top",
        "unicode": "1f51d",
        "name": "top with upwards arrow above",
        "shortname": ":top:"
    },
    {
        "key": "soon",
        "unicode": "1f51c",
        "name": "soon with rightwards arrow above",
        "shortname": ":soon:"
    },
    {
        "key": "ballot_box_with_check",
        "unicode": "2611",
        "name": "ballot box with check",
        "shortname": ":ballot_box_with_check:"
    },
    {
        "key": "radio_button",
        "unicode": "1f518",
        "name": "radio button",
        "shortname": ":radio_button:"
    },
    {
        "key": "white_circle",
        "unicode": "26aa",
        "name": "medium white circle",
        "shortname": ":white_circle:"
    },
    {
        "key": "black_circle",
        "unicode": "26ab",
        "name": "medium black circle",
        "shortname": ":black_circle:"
    },
    {
        "key": "red_circle",
        "unicode": "1f534",
        "name": "large red circle",
        "shortname": ":red_circle:"
    },
    {
        "key": "large_blue_circle",
        "unicode": "1f535",
        "name": "large blue circle",
        "shortname": ":large_blue_circle:"
    },
    {
        "key": "small_orange_diamond",
        "unicode": "1f538",
        "name": "small orange diamond",
        "shortname": ":small_orange_diamond:"
    },
    {
        "key": "small_blue_diamond",
        "unicode": "1f539",
        "name": "small blue diamond",
        "shortname": ":small_blue_diamond:"
    },
    {
        "key": "large_orange_diamond",
        "unicode": "1f536",
        "name": "large orange diamond",
        "shortname": ":large_orange_diamond:"
    },
    {
        "key": "large_blue_diamond",
        "unicode": "1f537",
        "name": "large blue diamond",
        "shortname": ":large_blue_diamond:"
    },
    {
        "key": "small_red_triangle",
        "unicode": "1f53a",
        "name": "up-pointing red triangle",
        "shortname": ":small_red_triangle:"
    },
    {
        "key": "black_small_square",
        "unicode": "25aa",
        "name": "black small square",
        "shortname": ":black_small_square:"
    },
    {
        "key": "white_small_square",
        "unicode": "25ab",
        "name": "white small square",
        "shortname": ":white_small_square:"
    },
    {
        "key": "black_large_square",
        "unicode": "2b1b",
        "name": "black large square",
        "shortname": ":black_large_square:"
    },
    {
        "key": "white_large_square",
        "unicode": "2b1c",
        "name": "white large square",
        "shortname": ":white_large_square:"
    },
    {
        "key": "small_red_triangle_down",
        "unicode": "1f53b",
        "name": "down-pointing red triangle",
        "shortname": ":small_red_triangle_down:"
    },
    {
        "key": "black_medium_square",
        "unicode": "25fc",
        "name": "black medium square",
        "shortname": ":black_medium_square:"
    },
    {
        "key": "white_medium_square",
        "unicode": "25fb",
        "name": "white medium square",
        "shortname": ":white_medium_square:"
    },
    {
        "key": "black_medium_small_square",
        "unicode": "25fe",
        "name": "black medium small square",
        "shortname": ":black_medium_small_square:"
    },
    {
        "key": "white_medium_small_square",
        "unicode": "25fd",
        "name": "white medium small square",
        "shortname": ":white_medium_small_square:"
    },
    {
        "key": "black_square_button",
        "unicode": "1f532",
        "name": "black square button",
        "shortname": ":black_square_button:"
    },
    {
        "key": "white_square_button",
        "unicode": "1f533",
        "name": "white square button",
        "shortname": ":white_square_button:"
    },
    {
        "key": "speaker",
        "unicode": "1f508",
        "name": "speaker",
        "shortname": ":speaker:"
    },
    {
        "key": "sound",
        "unicode": "1f509",
        "name": "speaker with one sound wave",
        "shortname": ":sound:"
    },
    {
        "key": "loud_sound",
        "unicode": "1f50a",
        "name": "speaker with three sound waves",
        "shortname": ":loud_sound:"
    },
    {
        "key": "mute",
        "unicode": "1f507",
        "name": "speaker with cancellation stroke",
        "shortname": ":mute:"
    },
    {
        "key": "mega",
        "unicode": "1f4e3",
        "name": "cheering megaphone",
        "shortname": ":mega:"
    },
    {
        "key": "loudspeaker",
        "unicode": "1f4e2",
        "name": "public address loudspeaker",
        "shortname": ":loudspeaker:"
    },
    {
        "key": "bell",
        "unicode": "1f514",
        "name": "bell",
        "shortname": ":bell:"
    },
    {
        "key": "no_bell",
        "unicode": "1f515",
        "name": "bell with cancellation stroke",
        "shortname": ":no_bell:"
    },
    {
        "key": "black_joker",
        "unicode": "1f0cf",
        "name": "playing card black joker",
        "shortname": ":black_joker:"
    },
    {
        "key": "mahjong",
        "unicode": "1f004",
        "name": "mahjong tile red dragon",
        "shortname": ":mahjong:"
    },
    {
        "key": "spades",
        "unicode": "2660",
        "name": "black spade suit",
        "shortname": ":spades:"
    },
    {
        "key": "clubs",
        "unicode": "2663",
        "name": "black club suit",
        "shortname": ":clubs:"
    },
    {
        "key": "hearts",
        "unicode": "2665",
        "name": "black heart suit",
        "shortname": ":hearts:"
    },
    {
        "key": "diamonds",
        "unicode": "2666",
        "name": "black diamond suit",
        "shortname": ":diamonds:"
    },
    {
        "key": "flower_playing_cards",
        "unicode": "1f3b4",
        "name": "flower playing cards",
        "shortname": ":flower_playing_cards:"
    },
    {
        "key": "thought_balloon",
        "unicode": "1f4ad",
        "name": "thought balloon",
        "shortname": ":thought_balloon:"
    },
    {
        "key": "anger_right",
        "unicode": "1f5ef",
        "name": "right anger bubble",
        "shortname": ":anger_right:"
    },
    {
        "key": "speech_balloon",
        "unicode": "1f4ac",
        "name": "speech balloon",
        "shortname": ":speech_balloon:"
    },
    {
        "key": "clock1",
        "unicode": "1f550",
        "name": "clock face one oclock",
        "shortname": ":clock1:"
    },
    {
        "key": "clock2",
        "unicode": "1f551",
        "name": "clock face two oclock",
        "shortname": ":clock2:"
    },
    {
        "key": "clock3",
        "unicode": "1f552",
        "name": "clock face three oclock",
        "shortname": ":clock3:"
    },
    {
        "key": "clock4",
        "unicode": "1f553",
        "name": "clock face four oclock",
        "shortname": ":clock4:"
    },
    {
        "key": "clock5",
        "unicode": "1f554",
        "name": "clock face five oclock",
        "shortname": ":clock5:"
    },
    {
        "key": "clock6",
        "unicode": "1f555",
        "name": "clock face six oclock",
        "shortname": ":clock6:"
    },
    {
        "key": "clock7",
        "unicode": "1f556",
        "name": "clock face seven oclock",
        "shortname": ":clock7:"
    },
    {
        "key": "clock8",
        "unicode": "1f557",
        "name": "clock face eight oclock",
        "shortname": ":clock8:"
    },
    {
        "key": "clock9",
        "unicode": "1f558",
        "name": "clock face nine oclock",
        "shortname": ":clock9:"
    },
    {
        "key": "clock10",
        "unicode": "1f559",
        "name": "clock face ten oclock",
        "shortname": ":clock10:"
    },
    {
        "key": "clock11",
        "unicode": "1f55a",
        "name": "clock face eleven oclock",
        "shortname": ":clock11:"
    },
    {
        "key": "clock12",
        "unicode": "1f55b",
        "name": "clock face twelve oclock",
        "shortname": ":clock12:"
    },
    {
        "key": "clock130",
        "unicode": "1f55c",
        "name": "clock face one-thirty",
        "shortname": ":clock130:"
    },
    {
        "key": "clock230",
        "unicode": "1f55d",
        "name": "clock face two-thirty",
        "shortname": ":clock230:"
    },
    {
        "key": "clock330",
        "unicode": "1f55e",
        "name": "clock face three-thirty",
        "shortname": ":clock330:"
    },
    {
        "key": "clock430",
        "unicode": "1f55f",
        "name": "clock face four-thirty",
        "shortname": ":clock430:"
    },
    {
        "key": "clock530",
        "unicode": "1f560",
        "name": "clock face five-thirty",
        "shortname": ":clock530:"
    },
    {
        "key": "clock630",
        "unicode": "1f561",
        "name": "clock face six-thirty",
        "shortname": ":clock630:"
    },
    {
        "key": "clock730",
        "unicode": "1f562",
        "name": "clock face seven-thirty",
        "shortname": ":clock730:"
    },
    {
        "key": "clock830",
        "unicode": "1f563",
        "name": "clock face eight-thirty",
        "shortname": ":clock830:"
    },
    {
        "key": "clock930",
        "unicode": "1f564",
        "name": "clock face nine-thirty",
        "shortname": ":clock930:"
    },
    {
        "key": "clock1030",
        "unicode": "1f565",
        "name": "clock face ten-thirty",
        "shortname": ":clock1030:"
    },
    {
        "key": "clock1130",
        "unicode": "1f566",
        "name": "clock face eleven-thirty",
        "shortname": ":clock1130:"
    },
    {
        "key": "clock1230",
        "unicode": "1f567",
        "name": "clock face twelve-thirty",
        "shortname": ":clock1230:"
    },
    {
        "key": "eye_in_speech_bubble",
        "unicode": "1f441-1f5e8",
        "name": "eye in speech bubble",
        "shortname": ":eye_in_speech_bubble:"
    },
    {
        "key": "flag_ac",
        "unicode": "1f1e6-1f1e8",
        "name": "ascension",
        "shortname": ":flag_ac:"
    },
    {
        "key": "flag_af",
        "unicode": "1f1e6-1f1eb",
        "name": "afghanistan",
        "shortname": ":flag_af:"
    },
    {
        "key": "flag_al",
        "unicode": "1f1e6-1f1f1",
        "name": "albania",
        "shortname": ":flag_al:"
    },
    {
        "key": "flag_dz",
        "unicode": "1f1e9-1f1ff",
        "name": "algeria",
        "shortname": ":flag_dz:"
    },
    {
        "key": "flag_ad",
        "unicode": "1f1e6-1f1e9",
        "name": "andorra",
        "shortname": ":flag_ad:"
    },
    {
        "key": "flag_ao",
        "unicode": "1f1e6-1f1f4",
        "name": "angola",
        "shortname": ":flag_ao:"
    },
    {
        "key": "flag_ai",
        "unicode": "1f1e6-1f1ee",
        "name": "anguilla",
        "shortname": ":flag_ai:"
    },
    {
        "key": "flag_ag",
        "unicode": "1f1e6-1f1ec",
        "name": "antigua and barbuda",
        "shortname": ":flag_ag:"
    },
    {
        "key": "flag_ar",
        "unicode": "1f1e6-1f1f7",
        "name": "argentina",
        "shortname": ":flag_ar:"
    },
    {
        "key": "flag_am",
        "unicode": "1f1e6-1f1f2",
        "name": "armenia",
        "shortname": ":flag_am:"
    },
    {
        "key": "flag_aw",
        "unicode": "1f1e6-1f1fc",
        "name": "aruba",
        "shortname": ":flag_aw:"
    },
    {
        "key": "flag_au",
        "unicode": "1f1e6-1f1fa",
        "name": "australia",
        "shortname": ":flag_au:"
    },
    {
        "key": "flag_at",
        "unicode": "1f1e6-1f1f9",
        "name": "austria",
        "shortname": ":flag_at:"
    },
    {
        "key": "flag_az",
        "unicode": "1f1e6-1f1ff",
        "name": "azerbaijan",
        "shortname": ":flag_az:"
    },
    {
        "key": "flag_bs",
        "unicode": "1f1e7-1f1f8",
        "name": "the bahamas",
        "shortname": ":flag_bs:"
    },
    {
        "key": "flag_bh",
        "unicode": "1f1e7-1f1ed",
        "name": "bahrain",
        "shortname": ":flag_bh:"
    },
    {
        "key": "flag_bd",
        "unicode": "1f1e7-1f1e9",
        "name": "bangladesh",
        "shortname": ":flag_bd:"
    },
    {
        "key": "flag_bb",
        "unicode": "1f1e7-1f1e7",
        "name": "barbados",
        "shortname": ":flag_bb:"
    },
    {
        "key": "flag_by",
        "unicode": "1f1e7-1f1fe",
        "name": "belarus",
        "shortname": ":flag_by:"
    },
    {
        "key": "flag_be",
        "unicode": "1f1e7-1f1ea",
        "name": "belgium",
        "shortname": ":flag_be:"
    },
    {
        "key": "flag_bz",
        "unicode": "1f1e7-1f1ff",
        "name": "belize",
        "shortname": ":flag_bz:"
    },
    {
        "key": "flag_bj",
        "unicode": "1f1e7-1f1ef",
        "name": "benin",
        "shortname": ":flag_bj:"
    },
    {
        "key": "flag_bm",
        "unicode": "1f1e7-1f1f2",
        "name": "bermuda",
        "shortname": ":flag_bm:"
    },
    {
        "key": "flag_bt",
        "unicode": "1f1e7-1f1f9",
        "name": "bhutan",
        "shortname": ":flag_bt:"
    },
    {
        "key": "flag_bo",
        "unicode": "1f1e7-1f1f4",
        "name": "bolivia",
        "shortname": ":flag_bo:"
    },
    {
        "key": "flag_ba",
        "unicode": "1f1e7-1f1e6",
        "name": "bosnia and herzegovina",
        "shortname": ":flag_ba:"
    },
    {
        "key": "flag_bw",
        "unicode": "1f1e7-1f1fc",
        "name": "botswana",
        "shortname": ":flag_bw:"
    },
    {
        "key": "flag_br",
        "unicode": "1f1e7-1f1f7",
        "name": "brazil",
        "shortname": ":flag_br:"
    },
    {
        "key": "flag_bn",
        "unicode": "1f1e7-1f1f3",
        "name": "brunei",
        "shortname": ":flag_bn:"
    },
    {
        "key": "flag_bg",
        "unicode": "1f1e7-1f1ec",
        "name": "bulgaria",
        "shortname": ":flag_bg:"
    },
    {
        "key": "flag_bf",
        "unicode": "1f1e7-1f1eb",
        "name": "burkina faso",
        "shortname": ":flag_bf:"
    },
    {
        "key": "flag_bi",
        "unicode": "1f1e7-1f1ee",
        "name": "burundi",
        "shortname": ":flag_bi:"
    },
    {
        "key": "flag_cv",
        "unicode": "1f1e8-1f1fb",
        "name": "cape verde",
        "shortname": ":flag_cv:"
    },
    {
        "key": "flag_kh",
        "unicode": "1f1f0-1f1ed",
        "name": "cambodia",
        "shortname": ":flag_kh:"
    },
    {
        "key": "flag_cm",
        "unicode": "1f1e8-1f1f2",
        "name": "cameroon",
        "shortname": ":flag_cm:"
    },
    {
        "key": "flag_ca",
        "unicode": "1f1e8-1f1e6",
        "name": "canada",
        "shortname": ":flag_ca:"
    },
    {
        "key": "flag_ky",
        "unicode": "1f1f0-1f1fe",
        "name": "cayman islands",
        "shortname": ":flag_ky:"
    },
    {
        "key": "flag_cf",
        "unicode": "1f1e8-1f1eb",
        "name": "central african republic",
        "shortname": ":flag_cf:"
    },
    {
        "key": "flag_td",
        "unicode": "1f1f9-1f1e9",
        "name": "chad",
        "shortname": ":flag_td:"
    },
    {
        "key": "flag_cl",
        "unicode": "1f1e8-1f1f1",
        "name": "chile",
        "shortname": ":flag_cl:"
    },
    {
        "key": "flag_cn",
        "unicode": "1f1e8-1f1f3",
        "name": "china",
        "shortname": ":flag_cn:"
    },
    {
        "key": "flag_co",
        "unicode": "1f1e8-1f1f4",
        "name": "colombia",
        "shortname": ":flag_co:"
    },
    {
        "key": "flag_km",
        "unicode": "1f1f0-1f1f2",
        "name": "the comoros",
        "shortname": ":flag_km:"
    },
    {
        "key": "flag_cg",
        "unicode": "1f1e8-1f1ec",
        "name": "the republic of the congo",
        "shortname": ":flag_cg:"
    },
    {
        "key": "flag_cd",
        "unicode": "1f1e8-1f1e9",
        "name": "the democratic republic of the congo",
        "shortname": ":flag_cd:"
    },
    {
        "key": "flag_cr",
        "unicode": "1f1e8-1f1f7",
        "name": "costa rica",
        "shortname": ":flag_cr:"
    },
    {
        "key": "flag_hr",
        "unicode": "1f1ed-1f1f7",
        "name": "croatia",
        "shortname": ":flag_hr:"
    },
    {
        "key": "flag_cu",
        "unicode": "1f1e8-1f1fa",
        "name": "cuba",
        "shortname": ":flag_cu:"
    },
    {
        "key": "flag_cy",
        "unicode": "1f1e8-1f1fe",
        "name": "cyprus",
        "shortname": ":flag_cy:"
    },
    {
        "key": "flag_cz",
        "unicode": "1f1e8-1f1ff",
        "name": "the czech republic",
        "shortname": ":flag_cz:"
    },
    {
        "key": "flag_dk",
        "unicode": "1f1e9-1f1f0",
        "name": "denmark",
        "shortname": ":flag_dk:"
    },
    {
        "key": "flag_dj",
        "unicode": "1f1e9-1f1ef",
        "name": "djibouti",
        "shortname": ":flag_dj:"
    },
    {
        "key": "flag_dm",
        "unicode": "1f1e9-1f1f2",
        "name": "dominica",
        "shortname": ":flag_dm:"
    },
    {
        "key": "flag_do",
        "unicode": "1f1e9-1f1f4",
        "name": "the dominican republic",
        "shortname": ":flag_do:"
    },
    {
        "key": "flag_ec",
        "unicode": "1f1ea-1f1e8",
        "name": "ecuador",
        "shortname": ":flag_ec:"
    },
    {
        "key": "flag_eg",
        "unicode": "1f1ea-1f1ec",
        "name": "egypt",
        "shortname": ":flag_eg:"
    },
    {
        "key": "flag_sv",
        "unicode": "1f1f8-1f1fb",
        "name": "el salvador",
        "shortname": ":flag_sv:"
    },
    {
        "key": "flag_gq",
        "unicode": "1f1ec-1f1f6",
        "name": "equatorial guinea",
        "shortname": ":flag_gq:"
    },
    {
        "key": "flag_er",
        "unicode": "1f1ea-1f1f7",
        "name": "eritrea",
        "shortname": ":flag_er:"
    },
    {
        "key": "flag_ee",
        "unicode": "1f1ea-1f1ea",
        "name": "estonia",
        "shortname": ":flag_ee:"
    },
    {
        "key": "flag_et",
        "unicode": "1f1ea-1f1f9",
        "name": "ethiopia",
        "shortname": ":flag_et:"
    },
    {
        "key": "flag_fk",
        "unicode": "1f1eb-1f1f0",
        "name": "falkland islands",
        "shortname": ":flag_fk:"
    },
    {
        "key": "flag_fo",
        "unicode": "1f1eb-1f1f4",
        "name": "faroe islands",
        "shortname": ":flag_fo:"
    },
    {
        "key": "flag_fj",
        "unicode": "1f1eb-1f1ef",
        "name": "fiji",
        "shortname": ":flag_fj:"
    },
    {
        "key": "flag_fi",
        "unicode": "1f1eb-1f1ee",
        "name": "finland",
        "shortname": ":flag_fi:"
    },
    {
        "key": "flag_fr",
        "unicode": "1f1eb-1f1f7",
        "name": "france",
        "shortname": ":flag_fr:"
    },
    {
        "key": "flag_pf",
        "unicode": "1f1f5-1f1eb",
        "name": "french polynesia",
        "shortname": ":flag_pf:"
    },
    {
        "key": "flag_ga",
        "unicode": "1f1ec-1f1e6",
        "name": "gabon",
        "shortname": ":flag_ga:"
    },
    {
        "key": "flag_gm",
        "unicode": "1f1ec-1f1f2",
        "name": "the gambia",
        "shortname": ":flag_gm:"
    },
    {
        "key": "flag_ge",
        "unicode": "1f1ec-1f1ea",
        "name": "georgia",
        "shortname": ":flag_ge:"
    },
    {
        "key": "flag_de",
        "unicode": "1f1e9-1f1ea",
        "name": "germany",
        "shortname": ":flag_de:"
    },
    {
        "key": "flag_gh",
        "unicode": "1f1ec-1f1ed",
        "name": "ghana",
        "shortname": ":flag_gh:"
    },
    {
        "key": "flag_gi",
        "unicode": "1f1ec-1f1ee",
        "name": "gibraltar",
        "shortname": ":flag_gi:"
    },
    {
        "key": "flag_gr",
        "unicode": "1f1ec-1f1f7",
        "name": "greece",
        "shortname": ":flag_gr:"
    },
    {
        "key": "flag_gl",
        "unicode": "1f1ec-1f1f1",
        "name": "greenland",
        "shortname": ":flag_gl:"
    },
    {
        "key": "flag_gd",
        "unicode": "1f1ec-1f1e9",
        "name": "grenada",
        "shortname": ":flag_gd:"
    },
    {
        "key": "flag_gu",
        "unicode": "1f1ec-1f1fa",
        "name": "guam",
        "shortname": ":flag_gu:"
    },
    {
        "key": "flag_gt",
        "unicode": "1f1ec-1f1f9",
        "name": "guatemala",
        "shortname": ":flag_gt:"
    },
    {
        "key": "flag_gn",
        "unicode": "1f1ec-1f1f3",
        "name": "guinea",
        "shortname": ":flag_gn:"
    },
    {
        "key": "flag_gw",
        "unicode": "1f1ec-1f1fc",
        "name": "guinea-bissau",
        "shortname": ":flag_gw:"
    },
    {
        "key": "flag_gy",
        "unicode": "1f1ec-1f1fe",
        "name": "guyana",
        "shortname": ":flag_gy:"
    },
    {
        "key": "flag_ht",
        "unicode": "1f1ed-1f1f9",
        "name": "haiti",
        "shortname": ":flag_ht:"
    },
    {
        "key": "flag_hn",
        "unicode": "1f1ed-1f1f3",
        "name": "honduras",
        "shortname": ":flag_hn:"
    },
    {
        "key": "flag_hk",
        "unicode": "1f1ed-1f1f0",
        "name": "hong kong",
        "shortname": ":flag_hk:"
    },
    {
        "key": "flag_hu",
        "unicode": "1f1ed-1f1fa",
        "name": "hungary",
        "shortname": ":flag_hu:"
    },
    {
        "key": "flag_is",
        "unicode": "1f1ee-1f1f8",
        "name": "iceland",
        "shortname": ":flag_is:"
    },
    {
        "key": "flag_in",
        "unicode": "1f1ee-1f1f3",
        "name": "india",
        "shortname": ":flag_in:"
    },
    {
        "key": "flag_id",
        "unicode": "1f1ee-1f1e9",
        "name": "indonesia",
        "shortname": ":flag_id:"
    },
    {
        "key": "flag_ir",
        "unicode": "1f1ee-1f1f7",
        "name": "iran",
        "shortname": ":flag_ir:"
    },
    {
        "key": "flag_iq",
        "unicode": "1f1ee-1f1f6",
        "name": "iraq",
        "shortname": ":flag_iq:"
    },
    {
        "key": "flag_ie",
        "unicode": "1f1ee-1f1ea",
        "name": "ireland",
        "shortname": ":flag_ie:"
    },
    {
        "key": "flag_il",
        "unicode": "1f1ee-1f1f1",
        "name": "israel",
        "shortname": ":flag_il:"
    },
    {
        "key": "flag_it",
        "unicode": "1f1ee-1f1f9",
        "name": "italy",
        "shortname": ":flag_it:"
    },
    {
        "key": "flag_ci",
        "unicode": "1f1e8-1f1ee",
        "name": "côte d’ivoire",
        "shortname": ":flag_ci:"
    },
    {
        "key": "flag_jm",
        "unicode": "1f1ef-1f1f2",
        "name": "jamaica",
        "shortname": ":flag_jm:"
    },
    {
        "key": "flag_jp",
        "unicode": "1f1ef-1f1f5",
        "name": "japan",
        "shortname": ":flag_jp:"
    },
    {
        "key": "flag_je",
        "unicode": "1f1ef-1f1ea",
        "name": "jersey",
        "shortname": ":flag_je:"
    },
    {
        "key": "flag_jo",
        "unicode": "1f1ef-1f1f4",
        "name": "jordan",
        "shortname": ":flag_jo:"
    },
    {
        "key": "flag_kz",
        "unicode": "1f1f0-1f1ff",
        "name": "kazakhstan",
        "shortname": ":flag_kz:"
    },
    {
        "key": "flag_ke",
        "unicode": "1f1f0-1f1ea",
        "name": "kenya",
        "shortname": ":flag_ke:"
    },
    {
        "key": "flag_ki",
        "unicode": "1f1f0-1f1ee",
        "name": "kiribati",
        "shortname": ":flag_ki:"
    },
    {
        "key": "flag_xk",
        "unicode": "1f1fd-1f1f0",
        "name": "kosovo",
        "shortname": ":flag_xk:"
    },
    {
        "key": "flag_kw",
        "unicode": "1f1f0-1f1fc",
        "name": "kuwait",
        "shortname": ":flag_kw:"
    },
    {
        "key": "flag_kg",
        "unicode": "1f1f0-1f1ec",
        "name": "kyrgyzstan",
        "shortname": ":flag_kg:"
    },
    {
        "key": "flag_la",
        "unicode": "1f1f1-1f1e6",
        "name": "laos",
        "shortname": ":flag_la:"
    },
    {
        "key": "flag_lv",
        "unicode": "1f1f1-1f1fb",
        "name": "latvia",
        "shortname": ":flag_lv:"
    },
    {
        "key": "flag_lb",
        "unicode": "1f1f1-1f1e7",
        "name": "lebanon",
        "shortname": ":flag_lb:"
    },
    {
        "key": "flag_ls",
        "unicode": "1f1f1-1f1f8",
        "name": "lesotho",
        "shortname": ":flag_ls:"
    },
    {
        "key": "flag_lr",
        "unicode": "1f1f1-1f1f7",
        "name": "liberia",
        "shortname": ":flag_lr:"
    },
    {
        "key": "flag_ly",
        "unicode": "1f1f1-1f1fe",
        "name": "libya",
        "shortname": ":flag_ly:"
    },
    {
        "key": "flag_li",
        "unicode": "1f1f1-1f1ee",
        "name": "liechtenstein",
        "shortname": ":flag_li:"
    },
    {
        "key": "flag_lt",
        "unicode": "1f1f1-1f1f9",
        "name": "lithuania",
        "shortname": ":flag_lt:"
    },
    {
        "key": "flag_lu",
        "unicode": "1f1f1-1f1fa",
        "name": "luxembourg",
        "shortname": ":flag_lu:"
    },
    {
        "key": "flag_mo",
        "unicode": "1f1f2-1f1f4",
        "name": "macau",
        "shortname": ":flag_mo:"
    },
    {
        "key": "flag_mk",
        "unicode": "1f1f2-1f1f0",
        "name": "macedonia",
        "shortname": ":flag_mk:"
    },
    {
        "key": "flag_mg",
        "unicode": "1f1f2-1f1ec",
        "name": "madagascar",
        "shortname": ":flag_mg:"
    },
    {
        "key": "flag_mw",
        "unicode": "1f1f2-1f1fc",
        "name": "malawi",
        "shortname": ":flag_mw:"
    },
    {
        "key": "flag_my",
        "unicode": "1f1f2-1f1fe",
        "name": "malaysia",
        "shortname": ":flag_my:"
    },
    {
        "key": "flag_mv",
        "unicode": "1f1f2-1f1fb",
        "name": "maldives",
        "shortname": ":flag_mv:"
    },
    {
        "key": "flag_ml",
        "unicode": "1f1f2-1f1f1",
        "name": "mali",
        "shortname": ":flag_ml:"
    },
    {
        "key": "flag_mt",
        "unicode": "1f1f2-1f1f9",
        "name": "malta",
        "shortname": ":flag_mt:"
    },
    {
        "key": "flag_mh",
        "unicode": "1f1f2-1f1ed",
        "name": "the marshall islands",
        "shortname": ":flag_mh:"
    },
    {
        "key": "flag_mr",
        "unicode": "1f1f2-1f1f7",
        "name": "mauritania",
        "shortname": ":flag_mr:"
    },
    {
        "key": "flag_mu",
        "unicode": "1f1f2-1f1fa",
        "name": "mauritius",
        "shortname": ":flag_mu:"
    },
    {
        "key": "flag_mx",
        "unicode": "1f1f2-1f1fd",
        "name": "mexico",
        "shortname": ":flag_mx:"
    },
    {
        "key": "flag_fm",
        "unicode": "1f1eb-1f1f2",
        "name": "micronesia",
        "shortname": ":flag_fm:"
    },
    {
        "key": "flag_md",
        "unicode": "1f1f2-1f1e9",
        "name": "moldova",
        "shortname": ":flag_md:"
    },
    {
        "key": "flag_mc",
        "unicode": "1f1f2-1f1e8",
        "name": "monaco",
        "shortname": ":flag_mc:"
    },
    {
        "key": "flag_mn",
        "unicode": "1f1f2-1f1f3",
        "name": "mongolia",
        "shortname": ":flag_mn:"
    },
    {
        "key": "flag_me",
        "unicode": "1f1f2-1f1ea",
        "name": "montenegro",
        "shortname": ":flag_me:"
    },
    {
        "key": "flag_ms",
        "unicode": "1f1f2-1f1f8",
        "name": "montserrat",
        "shortname": ":flag_ms:"
    },
    {
        "key": "flag_ma",
        "unicode": "1f1f2-1f1e6",
        "name": "morocco",
        "shortname": ":flag_ma:"
    },
    {
        "key": "flag_mz",
        "unicode": "1f1f2-1f1ff",
        "name": "mozambique",
        "shortname": ":flag_mz:"
    },
    {
        "key": "flag_mm",
        "unicode": "1f1f2-1f1f2",
        "name": "myanmar",
        "shortname": ":flag_mm:"
    },
    {
        "key": "flag_na",
        "unicode": "1f1f3-1f1e6",
        "name": "namibia",
        "shortname": ":flag_na:"
    },
    {
        "key": "flag_nr",
        "unicode": "1f1f3-1f1f7",
        "name": "nauru",
        "shortname": ":flag_nr:"
    },
    {
        "key": "flag_np",
        "unicode": "1f1f3-1f1f5",
        "name": "nepal",
        "shortname": ":flag_np:"
    },
    {
        "key": "flag_nl",
        "unicode": "1f1f3-1f1f1",
        "name": "the netherlands",
        "shortname": ":flag_nl:"
    },
    {
        "key": "flag_nc",
        "unicode": "1f1f3-1f1e8",
        "name": "new caledonia",
        "shortname": ":flag_nc:"
    },
    {
        "key": "flag_nz",
        "unicode": "1f1f3-1f1ff",
        "name": "new zealand",
        "shortname": ":flag_nz:"
    },
    {
        "key": "flag_ni",
        "unicode": "1f1f3-1f1ee",
        "name": "nicaragua",
        "shortname": ":flag_ni:"
    },
    {
        "key": "flag_ne",
        "unicode": "1f1f3-1f1ea",
        "name": "niger",
        "shortname": ":flag_ne:"
    },
    {
        "key": "flag_ng",
        "unicode": "1f1f3-1f1ec",
        "name": "nigeria",
        "shortname": ":flag_ng:"
    },
    {
        "key": "flag_nu",
        "unicode": "1f1f3-1f1fa",
        "name": "niue",
        "shortname": ":flag_nu:"
    },
    {
        "key": "flag_kp",
        "unicode": "1f1f0-1f1f5",
        "name": "north korea",
        "shortname": ":flag_kp:"
    },
    {
        "key": "flag_no",
        "unicode": "1f1f3-1f1f4",
        "name": "norway",
        "shortname": ":flag_no:"
    },
    {
        "key": "flag_om",
        "unicode": "1f1f4-1f1f2",
        "name": "oman",
        "shortname": ":flag_om:"
    },
    {
        "key": "flag_pk",
        "unicode": "1f1f5-1f1f0",
        "name": "pakistan",
        "shortname": ":flag_pk:"
    },
    {
        "key": "flag_pw",
        "unicode": "1f1f5-1f1fc",
        "name": "palau",
        "shortname": ":flag_pw:"
    },
    {
        "key": "flag_ps",
        "unicode": "1f1f5-1f1f8",
        "name": "palestinian authority",
        "shortname": ":flag_ps:"
    },
    {
        "key": "flag_pa",
        "unicode": "1f1f5-1f1e6",
        "name": "panama",
        "shortname": ":flag_pa:"
    },
    {
        "key": "flag_pg",
        "unicode": "1f1f5-1f1ec",
        "name": "papua new guinea",
        "shortname": ":flag_pg:"
    },
    {
        "key": "flag_py",
        "unicode": "1f1f5-1f1fe",
        "name": "paraguay",
        "shortname": ":flag_py:"
    },
    {
        "key": "flag_pe",
        "unicode": "1f1f5-1f1ea",
        "name": "peru",
        "shortname": ":flag_pe:"
    },
    {
        "key": "flag_ph",
        "unicode": "1f1f5-1f1ed",
        "name": "the philippines",
        "shortname": ":flag_ph:"
    },
    {
        "key": "flag_pl",
        "unicode": "1f1f5-1f1f1",
        "name": "poland",
        "shortname": ":flag_pl:"
    },
    {
        "key": "flag_pt",
        "unicode": "1f1f5-1f1f9",
        "name": "portugal",
        "shortname": ":flag_pt:"
    },
    {
        "key": "flag_pr",
        "unicode": "1f1f5-1f1f7",
        "name": "puerto rico",
        "shortname": ":flag_pr:"
    },
    {
        "key": "flag_qa",
        "unicode": "1f1f6-1f1e6",
        "name": "qatar",
        "shortname": ":flag_qa:"
    },
    {
        "key": "flag_ro",
        "unicode": "1f1f7-1f1f4",
        "name": "romania",
        "shortname": ":flag_ro:"
    },
    {
        "key": "flag_ru",
        "unicode": "1f1f7-1f1fa",
        "name": "russia",
        "shortname": ":flag_ru:"
    },
    {
        "key": "flag_rw",
        "unicode": "1f1f7-1f1fc",
        "name": "rwanda",
        "shortname": ":flag_rw:"
    },
    {
        "key": "flag_sh",
        "unicode": "1f1f8-1f1ed",
        "name": "saint helena",
        "shortname": ":flag_sh:"
    },
    {
        "key": "flag_kn",
        "unicode": "1f1f0-1f1f3",
        "name": "saint kitts and nevis",
        "shortname": ":flag_kn:"
    },
    {
        "key": "flag_lc",
        "unicode": "1f1f1-1f1e8",
        "name": "saint lucia",
        "shortname": ":flag_lc:"
    },
    {
        "key": "flag_vc",
        "unicode": "1f1fb-1f1e8",
        "name": "saint vincent and the grenadines",
        "shortname": ":flag_vc:"
    },
    {
        "key": "flag_ws",
        "unicode": "1f1fc-1f1f8",
        "name": "samoa",
        "shortname": ":flag_ws:"
    },
    {
        "key": "flag_sm",
        "unicode": "1f1f8-1f1f2",
        "name": "san marino",
        "shortname": ":flag_sm:"
    },
    {
        "key": "flag_st",
        "unicode": "1f1f8-1f1f9",
        "name": "são tomé and príncipe",
        "shortname": ":flag_st:"
    },
    {
        "key": "flag_sa",
        "unicode": "1f1f8-1f1e6",
        "name": "saudi arabia",
        "shortname": ":flag_sa:"
    },
    {
        "key": "flag_sn",
        "unicode": "1f1f8-1f1f3",
        "name": "senegal",
        "shortname": ":flag_sn:"
    },
    {
        "key": "flag_rs",
        "unicode": "1f1f7-1f1f8",
        "name": "serbia",
        "shortname": ":flag_rs:"
    },
    {
        "key": "flag_sc",
        "unicode": "1f1f8-1f1e8",
        "name": "the seychelles",
        "shortname": ":flag_sc:"
    },
    {
        "key": "flag_sl",
        "unicode": "1f1f8-1f1f1",
        "name": "sierra leone",
        "shortname": ":flag_sl:"
    },
    {
        "key": "flag_sg",
        "unicode": "1f1f8-1f1ec",
        "name": "singapore",
        "shortname": ":flag_sg:"
    },
    {
        "key": "flag_sk",
        "unicode": "1f1f8-1f1f0",
        "name": "slovakia",
        "shortname": ":flag_sk:"
    },
    {
        "key": "flag_si",
        "unicode": "1f1f8-1f1ee",
        "name": "slovenia",
        "shortname": ":flag_si:"
    },
    {
        "key": "flag_sb",
        "unicode": "1f1f8-1f1e7",
        "name": "the solomon islands",
        "shortname": ":flag_sb:"
    },
    {
        "key": "flag_so",
        "unicode": "1f1f8-1f1f4",
        "name": "somalia",
        "shortname": ":flag_so:"
    },
    {
        "key": "flag_za",
        "unicode": "1f1ff-1f1e6",
        "name": "south africa",
        "shortname": ":flag_za:"
    },
    {
        "key": "flag_kr",
        "unicode": "1f1f0-1f1f7",
        "name": "korea",
        "shortname": ":flag_kr:"
    },
    {
        "key": "flag_es",
        "unicode": "1f1ea-1f1f8",
        "name": "spain",
        "shortname": ":flag_es:"
    },
    {
        "key": "flag_lk",
        "unicode": "1f1f1-1f1f0",
        "name": "sri lanka",
        "shortname": ":flag_lk:"
    },
    {
        "key": "flag_sd",
        "unicode": "1f1f8-1f1e9",
        "name": "sudan",
        "shortname": ":flag_sd:"
    },
    {
        "key": "flag_sr",
        "unicode": "1f1f8-1f1f7",
        "name": "suriname",
        "shortname": ":flag_sr:"
    },
    {
        "key": "flag_sz",
        "unicode": "1f1f8-1f1ff",
        "name": "swaziland",
        "shortname": ":flag_sz:"
    },
    {
        "key": "flag_se",
        "unicode": "1f1f8-1f1ea",
        "name": "sweden",
        "shortname": ":flag_se:"
    },
    {
        "key": "flag_ch",
        "unicode": "1f1e8-1f1ed",
        "name": "switzerland",
        "shortname": ":flag_ch:"
    },
    {
        "key": "flag_sy",
        "unicode": "1f1f8-1f1fe",
        "name": "syria",
        "shortname": ":flag_sy:"
    },
    {
        "key": "flag_tw",
        "unicode": "1f1f9-1f1fc",
        "name": "the republic of china",
        "shortname": ":flag_tw:"
    },
    {
        "key": "flag_tj",
        "unicode": "1f1f9-1f1ef",
        "name": "tajikistan",
        "shortname": ":flag_tj:"
    },
    {
        "key": "flag_tz",
        "unicode": "1f1f9-1f1ff",
        "name": "tanzania",
        "shortname": ":flag_tz:"
    },
    {
        "key": "flag_th",
        "unicode": "1f1f9-1f1ed",
        "name": "thailand",
        "shortname": ":flag_th:"
    },
    {
        "key": "flag_tl",
        "unicode": "1f1f9-1f1f1",
        "name": "timor-leste",
        "shortname": ":flag_tl:"
    },
    {
        "key": "flag_tg",
        "unicode": "1f1f9-1f1ec",
        "name": "togo",
        "shortname": ":flag_tg:"
    },
    {
        "key": "flag_to",
        "unicode": "1f1f9-1f1f4",
        "name": "tonga",
        "shortname": ":flag_to:"
    },
    {
        "key": "flag_tt",
        "unicode": "1f1f9-1f1f9",
        "name": "trinidad and tobago",
        "shortname": ":flag_tt:"
    },
    {
        "key": "flag_tn",
        "unicode": "1f1f9-1f1f3",
        "name": "tunisia",
        "shortname": ":flag_tn:"
    },
    {
        "key": "flag_tr",
        "unicode": "1f1f9-1f1f7",
        "name": "turkey",
        "shortname": ":flag_tr:"
    },
    {
        "key": "flag_tm",
        "unicode": "1f1f9-1f1f2",
        "name": "turkmenistan",
        "shortname": ":flag_tm:"
    },
    {
        "key": "flag_tv",
        "unicode": "1f1f9-1f1fb",
        "name": "tuvalu",
        "shortname": ":flag_tv:"
    },
    {
        "key": "flag_ug",
        "unicode": "1f1fa-1f1ec",
        "name": "uganda",
        "shortname": ":flag_ug:"
    },
    {
        "key": "flag_ua",
        "unicode": "1f1fa-1f1e6",
        "name": "ukraine",
        "shortname": ":flag_ua:"
    },
    {
        "key": "flag_ae",
        "unicode": "1f1e6-1f1ea",
        "name": "the united arab emirates",
        "shortname": ":flag_ae:"
    },
    {
        "key": "flag_gb",
        "unicode": "1f1ec-1f1e7",
        "name": "great britain",
        "shortname": ":flag_gb:"
    },
    {
        "key": "flag_us",
        "unicode": "1f1fa-1f1f8",
        "name": "united states",
        "shortname": ":flag_us:"
    },
    {
        "key": "flag_vi",
        "unicode": "1f1fb-1f1ee",
        "name": "u.s. virgin islands",
        "shortname": ":flag_vi:"
    },
    {
        "key": "flag_uy",
        "unicode": "1f1fa-1f1fe",
        "name": "uruguay",
        "shortname": ":flag_uy:"
    },
    {
        "key": "flag_uz",
        "unicode": "1f1fa-1f1ff",
        "name": "uzbekistan",
        "shortname": ":flag_uz:"
    },
    {
        "key": "flag_vu",
        "unicode": "1f1fb-1f1fa",
        "name": "vanuatu",
        "shortname": ":flag_vu:"
    },
    {
        "key": "flag_va",
        "unicode": "1f1fb-1f1e6",
        "name": "the vatican city",
        "shortname": ":flag_va:"
    },
    {
        "key": "flag_ve",
        "unicode": "1f1fb-1f1ea",
        "name": "venezuela",
        "shortname": ":flag_ve:"
    },
    {
        "key": "flag_vn",
        "unicode": "1f1fb-1f1f3",
        "name": "vietnam",
        "shortname": ":flag_vn:"
    },
    {
        "key": "flag_wf",
        "unicode": "1f1fc-1f1eb",
        "name": "wallis and futuna",
        "shortname": ":flag_wf:"
    },
    {
        "key": "flag_eh",
        "unicode": "1f1ea-1f1ed",
        "name": "western sahara",
        "shortname": ":flag_eh:"
    },
    {
        "key": "flag_ye",
        "unicode": "1f1fe-1f1ea",
        "name": "yemen",
        "shortname": ":flag_ye:"
    },
    {
        "key": "flag_zm",
        "unicode": "1f1ff-1f1f2",
        "name": "zambia",
        "shortname": ":flag_zm:"
    },
    {
        "key": "flag_zw",
        "unicode": "1f1ff-1f1fc",
        "name": "zimbabwe",
        "shortname": ":flag_zw:"
    },
    {
        "key": "flag_re",
        "unicode": "1f1f7-1f1ea",
        "name": "réunion",
        "shortname": ":flag_re:"
    },
    {
        "key": "flag_ax",
        "unicode": "1f1e6-1f1fd",
        "name": "åland islands",
        "shortname": ":flag_ax:"
    },
    {
        "key": "flag_ta",
        "unicode": "1f1f9-1f1e6",
        "name": "tristan da cunha",
        "shortname": ":flag_ta:"
    },
    {
        "key": "flag_io",
        "unicode": "1f1ee-1f1f4",
        "name": "british indian ocean territory",
        "shortname": ":flag_io:"
    },
    {
        "key": "flag_bq",
        "unicode": "1f1e7-1f1f6",
        "name": "caribbean netherlands",
        "shortname": ":flag_bq:"
    },
    {
        "key": "flag_cx",
        "unicode": "1f1e8-1f1fd",
        "name": "christmas island",
        "shortname": ":flag_cx:"
    },
    {
        "key": "flag_cc",
        "unicode": "1f1e8-1f1e8",
        "name": "cocos (keeling) islands",
        "shortname": ":flag_cc:"
    },
    {
        "key": "flag_gg",
        "unicode": "1f1ec-1f1ec",
        "name": "guernsey",
        "shortname": ":flag_gg:"
    },
    {
        "key": "flag_im",
        "unicode": "1f1ee-1f1f2",
        "name": "isle of man",
        "shortname": ":flag_im:"
    },
    {
        "key": "flag_yt",
        "unicode": "1f1fe-1f1f9",
        "name": "mayotte",
        "shortname": ":flag_yt:"
    },
    {
        "key": "flag_nf",
        "unicode": "1f1f3-1f1eb",
        "name": "norfolk island",
        "shortname": ":flag_nf:"
    },
    {
        "key": "flag_pn",
        "unicode": "1f1f5-1f1f3",
        "name": "pitcairn",
        "shortname": ":flag_pn:"
    },
    {
        "key": "flag_bl",
        "unicode": "1f1e7-1f1f1",
        "name": "saint barthélemy",
        "shortname": ":flag_bl:"
    },
    {
        "key": "flag_pm",
        "unicode": "1f1f5-1f1f2",
        "name": "saint pierre and miquelon",
        "shortname": ":flag_pm:"
    },
    {
        "key": "flag_gs",
        "unicode": "1f1ec-1f1f8",
        "name": "south georgia",
        "shortname": ":flag_gs:"
    },
    {
        "key": "flag_tk",
        "unicode": "1f1f9-1f1f0",
        "name": "tokelau",
        "shortname": ":flag_tk:"
    },
    {
        "key": "flag_bv",
        "unicode": "1f1e7-1f1fb",
        "name": "bouvet island",
        "shortname": ":flag_bv:"
    },
    {
        "key": "flag_hm",
        "unicode": "1f1ed-1f1f2",
        "name": "heard island and mcdonald islands",
        "shortname": ":flag_hm:"
    },
    {
        "key": "flag_sj",
        "unicode": "1f1f8-1f1ef",
        "name": "svalbard and jan mayen",
        "shortname": ":flag_sj:"
    },
    {
        "key": "flag_um",
        "unicode": "1f1fa-1f1f2",
        "name": "united states minor outlying islands",
        "shortname": ":flag_um:"
    },
    {
        "key": "flag_ic",
        "unicode": "1f1ee-1f1e8",
        "name": "canary islands",
        "shortname": ":flag_ic:"
    },
    {
        "key": "flag_ea",
        "unicode": "1f1ea-1f1e6",
        "name": "ceuta, melilla",
        "shortname": ":flag_ea:"
    },
    {
        "key": "flag_cp",
        "unicode": "1f1e8-1f1f5",
        "name": "clipperton island",
        "shortname": ":flag_cp:"
    },
    {
        "key": "flag_dg",
        "unicode": "1f1e9-1f1ec",
        "name": "diego garcia",
        "shortname": ":flag_dg:"
    },
    {
        "key": "flag_as",
        "unicode": "1f1e6-1f1f8",
        "name": "american samoa",
        "shortname": ":flag_as:"
    },
    {
        "key": "flag_aq",
        "unicode": "1f1e6-1f1f6",
        "name": "antarctica",
        "shortname": ":flag_aq:"
    },
    {
        "key": "flag_vg",
        "unicode": "1f1fb-1f1ec",
        "name": "british virgin islands",
        "shortname": ":flag_vg:"
    },
    {
        "key": "flag_ck",
        "unicode": "1f1e8-1f1f0",
        "name": "cook islands",
        "shortname": ":flag_ck:"
    },
    {
        "key": "flag_cw",
        "unicode": "1f1e8-1f1fc",
        "name": "curaçao",
        "shortname": ":flag_cw:"
    },
    {
        "key": "flag_eu",
        "unicode": "1f1ea-1f1fa",
        "name": "european union",
        "shortname": ":flag_eu:"
    },
    {
        "key": "flag_gf",
        "unicode": "1f1ec-1f1eb",
        "name": "french guiana",
        "shortname": ":flag_gf:"
    },
    {
        "key": "flag_tf",
        "unicode": "1f1f9-1f1eb",
        "name": "french southern territories",
        "shortname": ":flag_tf:"
    },
    {
        "key": "flag_gp",
        "unicode": "1f1ec-1f1f5",
        "name": "guadeloupe",
        "shortname": ":flag_gp:"
    },
    {
        "key": "flag_mq",
        "unicode": "1f1f2-1f1f6",
        "name": "martinique",
        "shortname": ":flag_mq:"
    },
    {
        "key": "flag_mp",
        "unicode": "1f1f2-1f1f5",
        "name": "northern mariana islands",
        "shortname": ":flag_mp:"
    },
    {
        "key": "flag_sx",
        "unicode": "1f1f8-1f1fd",
        "name": "sint maarten",
        "shortname": ":flag_sx:"
    },
    {
        "key": "flag_ss",
        "unicode": "1f1f8-1f1f8",
        "name": "south sudan",
        "shortname": ":flag_ss:"
    },
    {
        "key": "flag_tc",
        "unicode": "1f1f9-1f1e8",
        "name": "turks and caicos islands",
        "shortname": ":flag_tc:"
    },
    {
        "key": "flag_mf",
        "unicode": "1f1f2-1f1eb",
        "name": "saint martin",
        "shortname": ":flag_mf:"
    },
    {
        "key": "raised_hands_tone1",
        "unicode": "1f64c-1f3fb",
        "name": "person raising both hands in celebration tone 1",
        "shortname": ":raised_hands_tone1:"
    },
    {
        "key": "raised_hands_tone2",
        "unicode": "1f64c-1f3fc",
        "name": "person raising both hands in celebration tone 2",
        "shortname": ":raised_hands_tone2:"
    },
    {
        "key": "raised_hands_tone3",
        "unicode": "1f64c-1f3fd",
        "name": "person raising both hands in celebration tone 3",
        "shortname": ":raised_hands_tone3:"
    },
    {
        "key": "raised_hands_tone4",
        "unicode": "1f64c-1f3fe",
        "name": "person raising both hands in celebration tone 4",
        "shortname": ":raised_hands_tone4:"
    },
    {
        "key": "raised_hands_tone5",
        "unicode": "1f64c-1f3ff",
        "name": "person raising both hands in celebration tone 5",
        "shortname": ":raised_hands_tone5:"
    },
    {
        "key": "clap_tone1",
        "unicode": "1f44f-1f3fb",
        "name": "clapping hands sign tone 1",
        "shortname": ":clap_tone1:"
    },
    {
        "key": "clap_tone2",
        "unicode": "1f44f-1f3fc",
        "name": "clapping hands sign tone 2",
        "shortname": ":clap_tone2:"
    },
    {
        "key": "clap_tone3",
        "unicode": "1f44f-1f3fd",
        "name": "clapping hands sign tone 3",
        "shortname": ":clap_tone3:"
    },
    {
        "key": "clap_tone4",
        "unicode": "1f44f-1f3fe",
        "name": "clapping hands sign tone 4",
        "shortname": ":clap_tone4:"
    },
    {
        "key": "clap_tone5",
        "unicode": "1f44f-1f3ff",
        "name": "clapping hands sign tone 5",
        "shortname": ":clap_tone5:"
    },
    {
        "key": "wave_tone1",
        "unicode": "1f44b-1f3fb",
        "name": "waving hand sign tone 1",
        "shortname": ":wave_tone1:"
    },
    {
        "key": "wave_tone2",
        "unicode": "1f44b-1f3fc",
        "name": "waving hand sign tone 2",
        "shortname": ":wave_tone2:"
    },
    {
        "key": "wave_tone3",
        "unicode": "1f44b-1f3fd",
        "name": "waving hand sign tone 3",
        "shortname": ":wave_tone3:"
    },
    {
        "key": "wave_tone4",
        "unicode": "1f44b-1f3fe",
        "name": "waving hand sign tone 4",
        "shortname": ":wave_tone4:"
    },
    {
        "key": "wave_tone5",
        "unicode": "1f44b-1f3ff",
        "name": "waving hand sign tone 5",
        "shortname": ":wave_tone5:"
    },
    {
        "key": "thumbsup_tone1",
        "unicode": "1f44d-1f3fb",
        "name": "thumbs up sign tone 1",
        "shortname": ":thumbsup_tone1:"
    },
    {
        "key": "thumbsup_tone2",
        "unicode": "1f44d-1f3fc",
        "name": "thumbs up sign tone 2",
        "shortname": ":thumbsup_tone2:"
    },
    {
        "key": "thumbsup_tone3",
        "unicode": "1f44d-1f3fd",
        "name": "thumbs up sign tone 3",
        "shortname": ":thumbsup_tone3:"
    },
    {
        "key": "thumbsup_tone4",
        "unicode": "1f44d-1f3fe",
        "name": "thumbs up sign tone 4",
        "shortname": ":thumbsup_tone4:"
    },
    {
        "key": "thumbsup_tone5",
        "unicode": "1f44d-1f3ff",
        "name": "thumbs up sign tone 5",
        "shortname": ":thumbsup_tone5:"
    },
    {
        "key": "thumbsdown_tone1",
        "unicode": "1f44e-1f3fb",
        "name": "thumbs down sign tone 1",
        "shortname": ":thumbsdown_tone1:"
    },
    {
        "key": "thumbsdown_tone2",
        "unicode": "1f44e-1f3fc",
        "name": "thumbs down sign tone 2",
        "shortname": ":thumbsdown_tone2:"
    },
    {
        "key": "thumbsdown_tone3",
        "unicode": "1f44e-1f3fd",
        "name": "thumbs down sign tone 3",
        "shortname": ":thumbsdown_tone3:"
    },
    {
        "key": "thumbsdown_tone4",
        "unicode": "1f44e-1f3fe",
        "name": "thumbs down sign tone 4",
        "shortname": ":thumbsdown_tone4:"
    },
    {
        "key": "thumbsdown_tone5",
        "unicode": "1f44e-1f3ff",
        "name": "thumbs down sign tone 5",
        "shortname": ":thumbsdown_tone5:"
    },
    {
        "key": "punch_tone1",
        "unicode": "1f44a-1f3fb",
        "name": "fisted hand sign tone 1",
        "shortname": ":punch_tone1:"
    },
    {
        "key": "punch_tone2",
        "unicode": "1f44a-1f3fc",
        "name": "fisted hand sign tone 2",
        "shortname": ":punch_tone2:"
    },
    {
        "key": "punch_tone3",
        "unicode": "1f44a-1f3fd",
        "name": "fisted hand sign tone 3",
        "shortname": ":punch_tone3:"
    },
    {
        "key": "punch_tone4",
        "unicode": "1f44a-1f3fe",
        "name": "fisted hand sign tone 4",
        "shortname": ":punch_tone4:"
    },
    {
        "key": "punch_tone5",
        "unicode": "1f44a-1f3ff",
        "name": "fisted hand sign tone 5",
        "shortname": ":punch_tone5:"
    },
    {
        "key": "fist_tone1",
        "unicode": "270a-1f3fb",
        "name": "raised fist tone 1",
        "shortname": ":fist_tone1:"
    },
    {
        "key": "fist_tone2",
        "unicode": "270a-1f3fc",
        "name": "raised fist tone 2",
        "shortname": ":fist_tone2:"
    },
    {
        "key": "fist_tone3",
        "unicode": "270a-1f3fd",
        "name": "raised fist tone 3",
        "shortname": ":fist_tone3:"
    },
    {
        "key": "fist_tone4",
        "unicode": "270a-1f3fe",
        "name": "raised fist tone 4",
        "shortname": ":fist_tone4:"
    },
    {
        "key": "fist_tone5",
        "unicode": "270a-1f3ff",
        "name": "raised fist tone 5",
        "shortname": ":fist_tone5:"
    },
    {
        "key": "v_tone1",
        "unicode": "270c-1f3fb",
        "name": "victory hand tone 1",
        "shortname": ":v_tone1:"
    },
    {
        "key": "v_tone2",
        "unicode": "270c-1f3fc",
        "name": "victory hand tone 2",
        "shortname": ":v_tone2:"
    },
    {
        "key": "v_tone3",
        "unicode": "270c-1f3fd",
        "name": "victory hand tone 3",
        "shortname": ":v_tone3:"
    },
    {
        "key": "v_tone4",
        "unicode": "270c-1f3fe",
        "name": "victory hand tone 4",
        "shortname": ":v_tone4:"
    },
    {
        "key": "v_tone5",
        "unicode": "270c-1f3ff",
        "name": "victory hand tone 5",
        "shortname": ":v_tone5:"
    },
    {
        "key": "ok_hand_tone1",
        "unicode": "1f44c-1f3fb",
        "name": "ok hand sign tone 1",
        "shortname": ":ok_hand_tone1:"
    },
    {
        "key": "ok_hand_tone2",
        "unicode": "1f44c-1f3fc",
        "name": "ok hand sign tone 2",
        "shortname": ":ok_hand_tone2:"
    },
    {
        "key": "ok_hand_tone3",
        "unicode": "1f44c-1f3fd",
        "name": "ok hand sign tone 3",
        "shortname": ":ok_hand_tone3:"
    },
    {
        "key": "ok_hand_tone4",
        "unicode": "1f44c-1f3fe",
        "name": "ok hand sign tone 4",
        "shortname": ":ok_hand_tone4:"
    },
    {
        "key": "ok_hand_tone5",
        "unicode": "1f44c-1f3ff",
        "name": "ok hand sign tone 5",
        "shortname": ":ok_hand_tone5:"
    },
    {
        "key": "raised_hand_tone1",
        "unicode": "270b-1f3fb",
        "name": "raised hand tone 1",
        "shortname": ":raised_hand_tone1:"
    },
    {
        "key": "raised_hand_tone2",
        "unicode": "270b-1f3fc",
        "name": "raised hand tone 2",
        "shortname": ":raised_hand_tone2:"
    },
    {
        "key": "raised_hand_tone3",
        "unicode": "270b-1f3fd",
        "name": "raised hand tone 3",
        "shortname": ":raised_hand_tone3:"
    },
    {
        "key": "raised_hand_tone4",
        "unicode": "270b-1f3fe",
        "name": "raised hand tone 4",
        "shortname": ":raised_hand_tone4:"
    },
    {
        "key": "raised_hand_tone5",
        "unicode": "270b-1f3ff",
        "name": "raised hand tone 5",
        "shortname": ":raised_hand_tone5:"
    },
    {
        "key": "open_hands_tone1",
        "unicode": "1f450-1f3fb",
        "name": "open hands sign tone 1",
        "shortname": ":open_hands_tone1:"
    },
    {
        "key": "open_hands_tone2",
        "unicode": "1f450-1f3fc",
        "name": "open hands sign tone 2",
        "shortname": ":open_hands_tone2:"
    },
    {
        "key": "open_hands_tone3",
        "unicode": "1f450-1f3fd",
        "name": "open hands sign tone 3",
        "shortname": ":open_hands_tone3:"
    },
    {
        "key": "open_hands_tone4",
        "unicode": "1f450-1f3fe",
        "name": "open hands sign tone 4",
        "shortname": ":open_hands_tone4:"
    },
    {
        "key": "open_hands_tone5",
        "unicode": "1f450-1f3ff",
        "name": "open hands sign tone 5",
        "shortname": ":open_hands_tone5:"
    },
    {
        "key": "muscle_tone1",
        "unicode": "1f4aa-1f3fb",
        "name": "flexed biceps tone 1",
        "shortname": ":muscle_tone1:"
    },
    {
        "key": "muscle_tone2",
        "unicode": "1f4aa-1f3fc",
        "name": "flexed biceps tone 2",
        "shortname": ":muscle_tone2:"
    },
    {
        "key": "muscle_tone3",
        "unicode": "1f4aa-1f3fd",
        "name": "flexed biceps tone 3",
        "shortname": ":muscle_tone3:"
    },
    {
        "key": "muscle_tone4",
        "unicode": "1f4aa-1f3fe",
        "name": "flexed biceps tone 4",
        "shortname": ":muscle_tone4:"
    },
    {
        "key": "muscle_tone5",
        "unicode": "1f4aa-1f3ff",
        "name": "flexed biceps tone 5",
        "shortname": ":muscle_tone5:"
    },
    {
        "key": "pray_tone1",
        "unicode": "1f64f-1f3fb",
        "name": "person with folded hands tone 1",
        "shortname": ":pray_tone1:"
    },
    {
        "key": "pray_tone2",
        "unicode": "1f64f-1f3fc",
        "name": "person with folded hands tone 2",
        "shortname": ":pray_tone2:"
    },
    {
        "key": "pray_tone3",
        "unicode": "1f64f-1f3fd",
        "name": "person with folded hands tone 3",
        "shortname": ":pray_tone3:"
    },
    {
        "key": "pray_tone4",
        "unicode": "1f64f-1f3fe",
        "name": "person with folded hands tone 4",
        "shortname": ":pray_tone4:"
    },
    {
        "key": "pray_tone5",
        "unicode": "1f64f-1f3ff",
        "name": "person with folded hands tone 5",
        "shortname": ":pray_tone5:"
    },
    {
        "key": "point_up_tone1",
        "unicode": "261d-1f3fb",
        "name": "white up pointing index tone 1",
        "shortname": ":point_up_tone1:"
    },
    {
        "key": "point_up_tone2",
        "unicode": "261d-1f3fc",
        "name": "white up pointing index tone 2",
        "shortname": ":point_up_tone2:"
    },
    {
        "key": "point_up_tone3",
        "unicode": "261d-1f3fd",
        "name": "white up pointing index tone 3",
        "shortname": ":point_up_tone3:"
    },
    {
        "key": "point_up_tone4",
        "unicode": "261d-1f3fe",
        "name": "white up pointing index tone 4",
        "shortname": ":point_up_tone4:"
    },
    {
        "key": "point_up_tone5",
        "unicode": "261d-1f3ff",
        "name": "white up pointing index tone 5",
        "shortname": ":point_up_tone5:"
    },
    {
        "key": "point_up_2_tone1",
        "unicode": "1f446-1f3fb",
        "name": "white up pointing backhand index tone 1",
        "shortname": ":point_up_2_tone1:"
    },
    {
        "key": "point_up_2_tone2",
        "unicode": "1f446-1f3fc",
        "name": "white up pointing backhand index tone 2",
        "shortname": ":point_up_2_tone2:"
    },
    {
        "key": "point_up_2_tone3",
        "unicode": "1f446-1f3fd",
        "name": "white up pointing backhand index tone 3",
        "shortname": ":point_up_2_tone3:"
    },
    {
        "key": "point_up_2_tone4",
        "unicode": "1f446-1f3fe",
        "name": "white up pointing backhand index tone 4",
        "shortname": ":point_up_2_tone4:"
    },
    {
        "key": "point_up_2_tone5",
        "unicode": "1f446-1f3ff",
        "name": "white up pointing backhand index tone 5",
        "shortname": ":point_up_2_tone5:"
    },
    {
        "key": "point_down_tone1",
        "unicode": "1f447-1f3fb",
        "name": "white down pointing backhand index tone 1",
        "shortname": ":point_down_tone1:"
    },
    {
        "key": "point_down_tone2",
        "unicode": "1f447-1f3fc",
        "name": "white down pointing backhand index tone 2",
        "shortname": ":point_down_tone2:"
    },
    {
        "key": "point_down_tone3",
        "unicode": "1f447-1f3fd",
        "name": "white down pointing backhand index tone 3",
        "shortname": ":point_down_tone3:"
    },
    {
        "key": "point_down_tone4",
        "unicode": "1f447-1f3fe",
        "name": "white down pointing backhand index tone 4",
        "shortname": ":point_down_tone4:"
    },
    {
        "key": "point_down_tone5",
        "unicode": "1f447-1f3ff",
        "name": "white down pointing backhand index tone 5",
        "shortname": ":point_down_tone5:"
    },
    {
        "key": "point_left_tone1",
        "unicode": "1f448-1f3fb",
        "name": "white left pointing backhand index tone 1",
        "shortname": ":point_left_tone1:"
    },
    {
        "key": "point_left_tone2",
        "unicode": "1f448-1f3fc",
        "name": "white left pointing backhand index tone 2",
        "shortname": ":point_left_tone2:"
    },
    {
        "key": "point_left_tone3",
        "unicode": "1f448-1f3fd",
        "name": "white left pointing backhand index tone 3",
        "shortname": ":point_left_tone3:"
    },
    {
        "key": "point_left_tone4",
        "unicode": "1f448-1f3fe",
        "name": "white left pointing backhand index tone 4",
        "shortname": ":point_left_tone4:"
    },
    {
        "key": "point_left_tone5",
        "unicode": "1f448-1f3ff",
        "name": "white left pointing backhand index tone 5",
        "shortname": ":point_left_tone5:"
    },
    {
        "key": "point_right_tone1",
        "unicode": "1f449-1f3fb",
        "name": "white right pointing backhand index tone 1",
        "shortname": ":point_right_tone1:"
    },
    {
        "key": "point_right_tone2",
        "unicode": "1f449-1f3fc",
        "name": "white right pointing backhand index tone 2",
        "shortname": ":point_right_tone2:"
    },
    {
        "key": "point_right_tone3",
        "unicode": "1f449-1f3fd",
        "name": "white right pointing backhand index tone 3",
        "shortname": ":point_right_tone3:"
    },
    {
        "key": "point_right_tone4",
        "unicode": "1f449-1f3fe",
        "name": "white right pointing backhand index tone 4",
        "shortname": ":point_right_tone4:"
    },
    {
        "key": "point_right_tone5",
        "unicode": "1f449-1f3ff",
        "name": "white right pointing backhand index tone 5",
        "shortname": ":point_right_tone5:"
    },
    {
        "key": "middle_finger_tone1",
        "unicode": "1f595-1f3fb",
        "name": "reversed hand with middle finger extended tone 1",
        "shortname": ":middle_finger_tone1:"
    },
    {
        "key": "middle_finger_tone2",
        "unicode": "1f595-1f3fc",
        "name": "reversed hand with middle finger extended tone 2",
        "shortname": ":middle_finger_tone2:"
    },
    {
        "key": "middle_finger_tone3",
        "unicode": "1f595-1f3fd",
        "name": "reversed hand with middle finger extended tone 3",
        "shortname": ":middle_finger_tone3:"
    },
    {
        "key": "middle_finger_tone4",
        "unicode": "1f595-1f3fe",
        "name": "reversed hand with middle finger extended tone 4",
        "shortname": ":middle_finger_tone4:"
    },
    {
        "key": "middle_finger_tone5",
        "unicode": "1f595-1f3ff",
        "name": "reversed hand with middle finger extended tone 5",
        "shortname": ":middle_finger_tone5:"
    },
    {
        "key": "hand_splayed_tone1",
        "unicode": "1f590-1f3fb",
        "name": "raised hand with fingers splayed tone 1",
        "shortname": ":hand_splayed_tone1:"
    },
    {
        "key": "hand_splayed_tone2",
        "unicode": "1f590-1f3fc",
        "name": "raised hand with fingers splayed tone 2",
        "shortname": ":hand_splayed_tone2:"
    },
    {
        "key": "hand_splayed_tone3",
        "unicode": "1f590-1f3fd",
        "name": "raised hand with fingers splayed tone 3",
        "shortname": ":hand_splayed_tone3:"
    },
    {
        "key": "hand_splayed_tone4",
        "unicode": "1f590-1f3fe",
        "name": "raised hand with fingers splayed tone 4",
        "shortname": ":hand_splayed_tone4:"
    },
    {
        "key": "hand_splayed_tone5",
        "unicode": "1f590-1f3ff",
        "name": "raised hand with fingers splayed tone 5",
        "shortname": ":hand_splayed_tone5:"
    },
    {
        "key": "metal_tone1",
        "unicode": "1f918-1f3fb",
        "name": "sign of the horns tone 1",
        "shortname": ":metal_tone1:"
    },
    {
        "key": "metal_tone2",
        "unicode": "1f918-1f3fc",
        "name": "sign of the horns tone 2",
        "shortname": ":metal_tone2:"
    },
    {
        "key": "metal_tone3",
        "unicode": "1f918-1f3fd",
        "name": "sign of the horns tone 3",
        "shortname": ":metal_tone3:"
    },
    {
        "key": "metal_tone4",
        "unicode": "1f918-1f3fe",
        "name": "sign of the horns tone 4",
        "shortname": ":metal_tone4:"
    },
    {
        "key": "metal_tone5",
        "unicode": "1f918-1f3ff",
        "name": "sign of the horns tone 5",
        "shortname": ":metal_tone5:"
    },
    {
        "key": "vulcan_tone1",
        "unicode": "1f596-1f3fb",
        "name": "raised hand with part between middle and ring fingers tone 1",
        "shortname": ":vulcan_tone1:"
    },
    {
        "key": "vulcan_tone2",
        "unicode": "1f596-1f3fc",
        "name": "raised hand with part between middle and ring fingers tone 2",
        "shortname": ":vulcan_tone2:"
    },
    {
        "key": "vulcan_tone3",
        "unicode": "1f596-1f3fd",
        "name": "raised hand with part between middle and ring fingers tone 3",
        "shortname": ":vulcan_tone3:"
    },
    {
        "key": "vulcan_tone4",
        "unicode": "1f596-1f3fe",
        "name": "raised hand with part between middle and ring fingers tone 4",
        "shortname": ":vulcan_tone4:"
    },
    {
        "key": "vulcan_tone5",
        "unicode": "1f596-1f3ff",
        "name": "raised hand with part between middle and ring fingers tone 5",
        "shortname": ":vulcan_tone5:"
    },
    {
        "key": "writing_hand_tone1",
        "unicode": "270d-1f3fb",
        "name": "writing hand tone 1",
        "shortname": ":writing_hand_tone1:"
    },
    {
        "key": "writing_hand_tone2",
        "unicode": "270d-1f3fc",
        "name": "writing hand tone 2",
        "shortname": ":writing_hand_tone2:"
    },
    {
        "key": "writing_hand_tone3",
        "unicode": "270d-1f3fd",
        "name": "writing hand tone 3",
        "shortname": ":writing_hand_tone3:"
    },
    {
        "key": "writing_hand_tone4",
        "unicode": "270d-1f3fe",
        "name": "writing hand tone 4",
        "shortname": ":writing_hand_tone4:"
    },
    {
        "key": "writing_hand_tone5",
        "unicode": "270d-1f3ff",
        "name": "writing hand tone 5",
        "shortname": ":writing_hand_tone5:"
    },
    {
        "key": "nail_care_tone1",
        "unicode": "1f485-1f3fb",
        "name": "nail polish tone 1",
        "shortname": ":nail_care_tone1:"
    },
    {
        "key": "nail_care_tone2",
        "unicode": "1f485-1f3fc",
        "name": "nail polish tone 2",
        "shortname": ":nail_care_tone2:"
    },
    {
        "key": "nail_care_tone3",
        "unicode": "1f485-1f3fd",
        "name": "nail polish tone 3",
        "shortname": ":nail_care_tone3:"
    },
    {
        "key": "nail_care_tone4",
        "unicode": "1f485-1f3fe",
        "name": "nail polish tone 4",
        "shortname": ":nail_care_tone4:"
    },
    {
        "key": "nail_care_tone5",
        "unicode": "1f485-1f3ff",
        "name": "nail polish tone 5",
        "shortname": ":nail_care_tone5:"
    },
    {
        "key": "ear_tone1",
        "unicode": "1f442-1f3fb",
        "name": "ear tone 1",
        "shortname": ":ear_tone1:"
    },
    {
        "key": "ear_tone2",
        "unicode": "1f442-1f3fc",
        "name": "ear tone 2",
        "shortname": ":ear_tone2:"
    },
    {
        "key": "ear_tone3",
        "unicode": "1f442-1f3fd",
        "name": "ear tone 3",
        "shortname": ":ear_tone3:"
    },
    {
        "key": "ear_tone4",
        "unicode": "1f442-1f3fe",
        "name": "ear tone 4",
        "shortname": ":ear_tone4:"
    },
    {
        "key": "ear_tone5",
        "unicode": "1f442-1f3ff",
        "name": "ear tone 5",
        "shortname": ":ear_tone5:"
    },
    {
        "key": "nose_tone1",
        "unicode": "1f443-1f3fb",
        "name": "nose tone 1",
        "shortname": ":nose_tone1:"
    },
    {
        "key": "nose_tone2",
        "unicode": "1f443-1f3fc",
        "name": "nose tone 2",
        "shortname": ":nose_tone2:"
    },
    {
        "key": "nose_tone3",
        "unicode": "1f443-1f3fd",
        "name": "nose tone 3",
        "shortname": ":nose_tone3:"
    },
    {
        "key": "nose_tone4",
        "unicode": "1f443-1f3fe",
        "name": "nose tone 4",
        "shortname": ":nose_tone4:"
    },
    {
        "key": "nose_tone5",
        "unicode": "1f443-1f3ff",
        "name": "nose tone 5",
        "shortname": ":nose_tone5:"
    },
    {
        "key": "baby_tone1",
        "unicode": "1f476-1f3fb",
        "name": "baby tone 1",
        "shortname": ":baby_tone1:"
    },
    {
        "key": "baby_tone2",
        "unicode": "1f476-1f3fc",
        "name": "baby tone 2",
        "shortname": ":baby_tone2:"
    },
    {
        "key": "baby_tone3",
        "unicode": "1f476-1f3fd",
        "name": "baby tone 3",
        "shortname": ":baby_tone3:"
    },
    {
        "key": "baby_tone4",
        "unicode": "1f476-1f3fe",
        "name": "baby tone 4",
        "shortname": ":baby_tone4:"
    },
    {
        "key": "baby_tone5",
        "unicode": "1f476-1f3ff",
        "name": "baby tone 5",
        "shortname": ":baby_tone5:"
    },
    {
        "key": "boy_tone1",
        "unicode": "1f466-1f3fb",
        "name": "boy tone 1",
        "shortname": ":boy_tone1:"
    },
    {
        "key": "boy_tone2",
        "unicode": "1f466-1f3fc",
        "name": "boy tone 2",
        "shortname": ":boy_tone2:"
    },
    {
        "key": "boy_tone3",
        "unicode": "1f466-1f3fd",
        "name": "boy tone 3",
        "shortname": ":boy_tone3:"
    },
    {
        "key": "boy_tone4",
        "unicode": "1f466-1f3fe",
        "name": "boy tone 4",
        "shortname": ":boy_tone4:"
    },
    {
        "key": "boy_tone5",
        "unicode": "1f466-1f3ff",
        "name": "boy tone 5",
        "shortname": ":boy_tone5:"
    },
    {
        "key": "girl_tone1",
        "unicode": "1f467-1f3fb",
        "name": "girl tone 1",
        "shortname": ":girl_tone1:"
    },
    {
        "key": "girl_tone2",
        "unicode": "1f467-1f3fc",
        "name": "girl tone 2",
        "shortname": ":girl_tone2:"
    },
    {
        "key": "girl_tone3",
        "unicode": "1f467-1f3fd",
        "name": "girl tone 3",
        "shortname": ":girl_tone3:"
    },
    {
        "key": "girl_tone4",
        "unicode": "1f467-1f3fe",
        "name": "girl tone 4",
        "shortname": ":girl_tone4:"
    },
    {
        "key": "girl_tone5",
        "unicode": "1f467-1f3ff",
        "name": "girl tone 5",
        "shortname": ":girl_tone5:"
    },
    {
        "key": "man_tone1",
        "unicode": "1f468-1f3fb",
        "name": "man tone 1",
        "shortname": ":man_tone1:"
    },
    {
        "key": "man_tone2",
        "unicode": "1f468-1f3fc",
        "name": "man tone 2",
        "shortname": ":man_tone2:"
    },
    {
        "key": "man_tone3",
        "unicode": "1f468-1f3fd",
        "name": "man tone 3",
        "shortname": ":man_tone3:"
    },
    {
        "key": "man_tone4",
        "unicode": "1f468-1f3fe",
        "name": "man tone 4",
        "shortname": ":man_tone4:"
    },
    {
        "key": "man_tone5",
        "unicode": "1f468-1f3ff",
        "name": "man tone 5",
        "shortname": ":man_tone5:"
    },
    {
        "key": "woman_tone1",
        "unicode": "1f469-1f3fb",
        "name": "woman tone 1",
        "shortname": ":woman_tone1:"
    },
    {
        "key": "woman_tone2",
        "unicode": "1f469-1f3fc",
        "name": "woman tone 2",
        "shortname": ":woman_tone2:"
    },
    {
        "key": "woman_tone3",
        "unicode": "1f469-1f3fd",
        "name": "woman tone 3",
        "shortname": ":woman_tone3:"
    },
    {
        "key": "woman_tone4",
        "unicode": "1f469-1f3fe",
        "name": "woman tone 4",
        "shortname": ":woman_tone4:"
    },
    {
        "key": "woman_tone5",
        "unicode": "1f469-1f3ff",
        "name": "woman tone 5",
        "shortname": ":woman_tone5:"
    },
    {
        "key": "person_with_blond_hair_tone1",
        "unicode": "1f471-1f3fb",
        "name": "person with blond hair tone 1",
        "shortname": ":person_with_blond_hair_tone1:"
    },
    {
        "key": "person_with_blond_hair_tone2",
        "unicode": "1f471-1f3fc",
        "name": "person with blond hair tone 2",
        "shortname": ":person_with_blond_hair_tone2:"
    },
    {
        "key": "person_with_blond_hair_tone3",
        "unicode": "1f471-1f3fd",
        "name": "person with blond hair tone 3",
        "shortname": ":person_with_blond_hair_tone3:"
    },
    {
        "key": "person_with_blond_hair_tone4",
        "unicode": "1f471-1f3fe",
        "name": "person with blond hair tone 4",
        "shortname": ":person_with_blond_hair_tone4:"
    },
    {
        "key": "person_with_blond_hair_tone5",
        "unicode": "1f471-1f3ff",
        "name": "person with blond hair tone 5",
        "shortname": ":person_with_blond_hair_tone5:"
    },
    {
        "key": "older_man_tone1",
        "unicode": "1f474-1f3fb",
        "name": "older man tone 1",
        "shortname": ":older_man_tone1:"
    },
    {
        "key": "older_man_tone2",
        "unicode": "1f474-1f3fc",
        "name": "older man tone 2",
        "shortname": ":older_man_tone2:"
    },
    {
        "key": "older_man_tone3",
        "unicode": "1f474-1f3fd",
        "name": "older man tone 3",
        "shortname": ":older_man_tone3:"
    },
    {
        "key": "older_man_tone4",
        "unicode": "1f474-1f3fe",
        "name": "older man tone 4",
        "shortname": ":older_man_tone4:"
    },
    {
        "key": "older_man_tone5",
        "unicode": "1f474-1f3ff",
        "name": "older man tone 5",
        "shortname": ":older_man_tone5:"
    },
    {
        "key": "older_woman_tone1",
        "unicode": "1f475-1f3fb",
        "name": "older woman tone 1",
        "shortname": ":older_woman_tone1:"
    },
    {
        "key": "older_woman_tone2",
        "unicode": "1f475-1f3fc",
        "name": "older woman tone 2",
        "shortname": ":older_woman_tone2:"
    },
    {
        "key": "older_woman_tone3",
        "unicode": "1f475-1f3fd",
        "name": "older woman tone 3",
        "shortname": ":older_woman_tone3:"
    },
    {
        "key": "older_woman_tone4",
        "unicode": "1f475-1f3fe",
        "name": "older woman tone 4",
        "shortname": ":older_woman_tone4:"
    },
    {
        "key": "older_woman_tone5",
        "unicode": "1f475-1f3ff",
        "name": "older woman tone 5",
        "shortname": ":older_woman_tone5:"
    },
    {
        "key": "man_with_gua_pi_mao_tone1",
        "unicode": "1f472-1f3fb",
        "name": "man with gua pi mao tone 1",
        "shortname": ":man_with_gua_pi_mao_tone1:"
    },
    {
        "key": "man_with_gua_pi_mao_tone2",
        "unicode": "1f472-1f3fc",
        "name": "man with gua pi mao tone 2",
        "shortname": ":man_with_gua_pi_mao_tone2:"
    },
    {
        "key": "man_with_gua_pi_mao_tone3",
        "unicode": "1f472-1f3fd",
        "name": "man with gua pi mao tone 3",
        "shortname": ":man_with_gua_pi_mao_tone3:"
    },
    {
        "key": "man_with_gua_pi_mao_tone4",
        "unicode": "1f472-1f3fe",
        "name": "man with gua pi mao tone 4",
        "shortname": ":man_with_gua_pi_mao_tone4:"
    },
    {
        "key": "man_with_gua_pi_mao_tone5",
        "unicode": "1f472-1f3ff",
        "name": "man with gua pi mao tone 5",
        "shortname": ":man_with_gua_pi_mao_tone5:"
    },
    {
        "key": "man_with_turban_tone1",
        "unicode": "1f473-1f3fb",
        "name": "man with turban tone 1",
        "shortname": ":man_with_turban_tone1:"
    },
    {
        "key": "man_with_turban_tone2",
        "unicode": "1f473-1f3fc",
        "name": "man with turban tone 2",
        "shortname": ":man_with_turban_tone2:"
    },
    {
        "key": "man_with_turban_tone3",
        "unicode": "1f473-1f3fd",
        "name": "man with turban tone 3",
        "shortname": ":man_with_turban_tone3:"
    },
    {
        "key": "man_with_turban_tone4",
        "unicode": "1f473-1f3fe",
        "name": "man with turban tone 4",
        "shortname": ":man_with_turban_tone4:"
    },
    {
        "key": "man_with_turban_tone5",
        "unicode": "1f473-1f3ff",
        "name": "man with turban tone 5",
        "shortname": ":man_with_turban_tone5:"
    },
    {
        "key": "cop_tone1",
        "unicode": "1f46e-1f3fb",
        "name": "police officer tone 1",
        "shortname": ":cop_tone1:"
    },
    {
        "key": "cop_tone2",
        "unicode": "1f46e-1f3fc",
        "name": "police officer tone 2",
        "shortname": ":cop_tone2:"
    },
    {
        "key": "cop_tone3",
        "unicode": "1f46e-1f3fd",
        "name": "police officer tone 3",
        "shortname": ":cop_tone3:"
    },
    {
        "key": "cop_tone4",
        "unicode": "1f46e-1f3fe",
        "name": "police officer tone 4",
        "shortname": ":cop_tone4:"
    },
    {
        "key": "cop_tone5",
        "unicode": "1f46e-1f3ff",
        "name": "police officer tone 5",
        "shortname": ":cop_tone5:"
    },
    {
        "key": "construction_worker_tone1",
        "unicode": "1f477-1f3fb",
        "name": "construction worker tone 1",
        "shortname": ":construction_worker_tone1:"
    },
    {
        "key": "construction_worker_tone2",
        "unicode": "1f477-1f3fc",
        "name": "construction worker tone 2",
        "shortname": ":construction_worker_tone2:"
    },
    {
        "key": "construction_worker_tone3",
        "unicode": "1f477-1f3fd",
        "name": "construction worker tone 3",
        "shortname": ":construction_worker_tone3:"
    },
    {
        "key": "construction_worker_tone4",
        "unicode": "1f477-1f3fe",
        "name": "construction worker tone 4",
        "shortname": ":construction_worker_tone4:"
    },
    {
        "key": "construction_worker_tone5",
        "unicode": "1f477-1f3ff",
        "name": "construction worker tone 5",
        "shortname": ":construction_worker_tone5:"
    },
    {
        "key": "guardsman_tone1",
        "unicode": "1f482-1f3fb",
        "name": "guardsman tone 1",
        "shortname": ":guardsman_tone1:"
    },
    {
        "key": "guardsman_tone2",
        "unicode": "1f482-1f3fc",
        "name": "guardsman tone 2",
        "shortname": ":guardsman_tone2:"
    },
    {
        "key": "guardsman_tone3",
        "unicode": "1f482-1f3fd",
        "name": "guardsman tone 3",
        "shortname": ":guardsman_tone3:"
    },
    {
        "key": "guardsman_tone4",
        "unicode": "1f482-1f3fe",
        "name": "guardsman tone 4",
        "shortname": ":guardsman_tone4:"
    },
    {
        "key": "guardsman_tone5",
        "unicode": "1f482-1f3ff",
        "name": "guardsman tone 5",
        "shortname": ":guardsman_tone5:"
    },
    {
        "key": "santa_tone1",
        "unicode": "1f385-1f3fb",
        "name": "father christmas tone 1",
        "shortname": ":santa_tone1:"
    },
    {
        "key": "santa_tone2",
        "unicode": "1f385-1f3fc",
        "name": "father christmas tone 2",
        "shortname": ":santa_tone2:"
    },
    {
        "key": "santa_tone3",
        "unicode": "1f385-1f3fd",
        "name": "father christmas tone 3",
        "shortname": ":santa_tone3:"
    },
    {
        "key": "santa_tone4",
        "unicode": "1f385-1f3fe",
        "name": "father christmas tone 4",
        "shortname": ":santa_tone4:"
    },
    {
        "key": "santa_tone5",
        "unicode": "1f385-1f3ff",
        "name": "father christmas tone 5",
        "shortname": ":santa_tone5:"
    },
    {
        "key": "angel_tone1",
        "unicode": "1f47c-1f3fb",
        "name": "baby angel tone 1",
        "shortname": ":angel_tone1:"
    },
    {
        "key": "angel_tone2",
        "unicode": "1f47c-1f3fc",
        "name": "baby angel tone 2",
        "shortname": ":angel_tone2:"
    },
    {
        "key": "angel_tone3",
        "unicode": "1f47c-1f3fd",
        "name": "baby angel tone 3",
        "shortname": ":angel_tone3:"
    },
    {
        "key": "angel_tone4",
        "unicode": "1f47c-1f3fe",
        "name": "baby angel tone 4",
        "shortname": ":angel_tone4:"
    },
    {
        "key": "angel_tone5",
        "unicode": "1f47c-1f3ff",
        "name": "baby angel tone 5",
        "shortname": ":angel_tone5:"
    },
    {
        "key": "princess_tone1",
        "unicode": "1f478-1f3fb",
        "name": "princess tone 1",
        "shortname": ":princess_tone1:"
    },
    {
        "key": "princess_tone2",
        "unicode": "1f478-1f3fc",
        "name": "princess tone 2",
        "shortname": ":princess_tone2:"
    },
    {
        "key": "princess_tone3",
        "unicode": "1f478-1f3fd",
        "name": "princess tone 3",
        "shortname": ":princess_tone3:"
    },
    {
        "key": "princess_tone4",
        "unicode": "1f478-1f3fe",
        "name": "princess tone 4",
        "shortname": ":princess_tone4:"
    },
    {
        "key": "princess_tone5",
        "unicode": "1f478-1f3ff",
        "name": "princess tone 5",
        "shortname": ":princess_tone5:"
    },
    {
        "key": "bride_with_veil_tone1",
        "unicode": "1f470-1f3fb",
        "name": "bride with veil tone 1",
        "shortname": ":bride_with_veil_tone1:"
    },
    {
        "key": "bride_with_veil_tone2",
        "unicode": "1f470-1f3fc",
        "name": "bride with veil tone 2",
        "shortname": ":bride_with_veil_tone2:"
    },
    {
        "key": "bride_with_veil_tone3",
        "unicode": "1f470-1f3fd",
        "name": "bride with veil tone 3",
        "shortname": ":bride_with_veil_tone3:"
    },
    {
        "key": "bride_with_veil_tone4",
        "unicode": "1f470-1f3fe",
        "name": "bride with veil tone 4",
        "shortname": ":bride_with_veil_tone4:"
    },
    {
        "key": "bride_with_veil_tone5",
        "unicode": "1f470-1f3ff",
        "name": "bride with veil tone 5",
        "shortname": ":bride_with_veil_tone5:"
    },
    {
        "key": "walking_tone1",
        "unicode": "1f6b6-1f3fb",
        "name": "pedestrian tone 1",
        "shortname": ":walking_tone1:"
    },
    {
        "key": "walking_tone2",
        "unicode": "1f6b6-1f3fc",
        "name": "pedestrian tone 2",
        "shortname": ":walking_tone2:"
    },
    {
        "key": "walking_tone3",
        "unicode": "1f6b6-1f3fd",
        "name": "pedestrian tone 3",
        "shortname": ":walking_tone3:"
    },
    {
        "key": "walking_tone4",
        "unicode": "1f6b6-1f3fe",
        "name": "pedestrian tone 4",
        "shortname": ":walking_tone4:"
    },
    {
        "key": "walking_tone5",
        "unicode": "1f6b6-1f3ff",
        "name": "pedestrian tone 5",
        "shortname": ":walking_tone5:"
    },
    {
        "key": "runner_tone1",
        "unicode": "1f3c3-1f3fb",
        "name": "runner tone 1",
        "shortname": ":runner_tone1:"
    },
    {
        "key": "runner_tone2",
        "unicode": "1f3c3-1f3fc",
        "name": "runner tone 2",
        "shortname": ":runner_tone2:"
    },
    {
        "key": "runner_tone3",
        "unicode": "1f3c3-1f3fd",
        "name": "runner tone 3",
        "shortname": ":runner_tone3:"
    },
    {
        "key": "runner_tone4",
        "unicode": "1f3c3-1f3fe",
        "name": "runner tone 4",
        "shortname": ":runner_tone4:"
    },
    {
        "key": "runner_tone5",
        "unicode": "1f3c3-1f3ff",
        "name": "runner tone 5",
        "shortname": ":runner_tone5:"
    },
    {
        "key": "dancer_tone1",
        "unicode": "1f483-1f3fb",
        "name": "dancer tone 1",
        "shortname": ":dancer_tone1:"
    },
    {
        "key": "dancer_tone2",
        "unicode": "1f483-1f3fc",
        "name": "dancer tone 2",
        "shortname": ":dancer_tone2:"
    },
    {
        "key": "dancer_tone3",
        "unicode": "1f483-1f3fd",
        "name": "dancer tone 3",
        "shortname": ":dancer_tone3:"
    },
    {
        "key": "dancer_tone4",
        "unicode": "1f483-1f3fe",
        "name": "dancer tone 4",
        "shortname": ":dancer_tone4:"
    },
    {
        "key": "dancer_tone5",
        "unicode": "1f483-1f3ff",
        "name": "dancer tone 5",
        "shortname": ":dancer_tone5:"
    },
    {
        "key": "bow_tone1",
        "unicode": "1f647-1f3fb",
        "name": "person bowing deeply tone 1",
        "shortname": ":bow_tone1:"
    },
    {
        "key": "bow_tone2",
        "unicode": "1f647-1f3fc",
        "name": "person bowing deeply tone 2",
        "shortname": ":bow_tone2:"
    },
    {
        "key": "bow_tone3",
        "unicode": "1f647-1f3fd",
        "name": "person bowing deeply tone 3",
        "shortname": ":bow_tone3:"
    },
    {
        "key": "bow_tone4",
        "unicode": "1f647-1f3fe",
        "name": "person bowing deeply tone 4",
        "shortname": ":bow_tone4:"
    },
    {
        "key": "bow_tone5",
        "unicode": "1f647-1f3ff",
        "name": "person bowing deeply tone 5",
        "shortname": ":bow_tone5:"
    },
    {
        "key": "information_desk_person_tone1",
        "unicode": "1f481-1f3fb",
        "name": "information desk person tone 1",
        "shortname": ":information_desk_person_tone1:"
    },
    {
        "key": "information_desk_person_tone2",
        "unicode": "1f481-1f3fc",
        "name": "information desk person tone 2",
        "shortname": ":information_desk_person_tone2:"
    },
    {
        "key": "information_desk_person_tone3",
        "unicode": "1f481-1f3fd",
        "name": "information desk person tone 3",
        "shortname": ":information_desk_person_tone3:"
    },
    {
        "key": "information_desk_person_tone4",
        "unicode": "1f481-1f3fe",
        "name": "information desk person tone 4",
        "shortname": ":information_desk_person_tone4:"
    },
    {
        "key": "information_desk_person_tone5",
        "unicode": "1f481-1f3ff",
        "name": "information desk person tone 5",
        "shortname": ":information_desk_person_tone5:"
    },
    {
        "key": "no_good_tone1",
        "unicode": "1f645-1f3fb",
        "name": "face with no good gesture tone 1",
        "shortname": ":no_good_tone1:"
    },
    {
        "key": "no_good_tone2",
        "unicode": "1f645-1f3fc",
        "name": "face with no good gesture tone 2",
        "shortname": ":no_good_tone2:"
    },
    {
        "key": "no_good_tone3",
        "unicode": "1f645-1f3fd",
        "name": "face with no good gesture tone 3",
        "shortname": ":no_good_tone3:"
    },
    {
        "key": "no_good_tone4",
        "unicode": "1f645-1f3fe",
        "name": "face with no good gesture tone 4",
        "shortname": ":no_good_tone4:"
    },
    {
        "key": "no_good_tone5",
        "unicode": "1f645-1f3ff",
        "name": "face with no good gesture tone 5",
        "shortname": ":no_good_tone5:"
    },
    {
        "key": "ok_woman_tone1",
        "unicode": "1f646-1f3fb",
        "name": "face with ok gesture tone1",
        "shortname": ":ok_woman_tone1:"
    },
    {
        "key": "ok_woman_tone2",
        "unicode": "1f646-1f3fc",
        "name": "face with ok gesture tone2",
        "shortname": ":ok_woman_tone2:"
    },
    {
        "key": "ok_woman_tone3",
        "unicode": "1f646-1f3fd",
        "name": "face with ok gesture tone3",
        "shortname": ":ok_woman_tone3:"
    },
    {
        "key": "ok_woman_tone4",
        "unicode": "1f646-1f3fe",
        "name": "face with ok gesture tone4",
        "shortname": ":ok_woman_tone4:"
    },
    {
        "key": "ok_woman_tone5",
        "unicode": "1f646-1f3ff",
        "name": "face with ok gesture tone5",
        "shortname": ":ok_woman_tone5:"
    },
    {
        "key": "raising_hand_tone1",
        "unicode": "1f64b-1f3fb",
        "name": "happy person raising one hand tone1",
        "shortname": ":raising_hand_tone1:"
    },
    {
        "key": "raising_hand_tone2",
        "unicode": "1f64b-1f3fc",
        "name": "happy person raising one hand tone2",
        "shortname": ":raising_hand_tone2:"
    },
    {
        "key": "raising_hand_tone3",
        "unicode": "1f64b-1f3fd",
        "name": "happy person raising one hand tone3",
        "shortname": ":raising_hand_tone3:"
    },
    {
        "key": "raising_hand_tone4",
        "unicode": "1f64b-1f3fe",
        "name": "happy person raising one hand tone4",
        "shortname": ":raising_hand_tone4:"
    },
    {
        "key": "raising_hand_tone5",
        "unicode": "1f64b-1f3ff",
        "name": "happy person raising one hand tone5",
        "shortname": ":raising_hand_tone5:"
    },
    {
        "key": "person_with_pouting_face_tone1",
        "unicode": "1f64e-1f3fb",
        "name": "person with pouting face tone1",
        "shortname": ":person_with_pouting_face_tone1:"
    },
    {
        "key": "person_with_pouting_face_tone2",
        "unicode": "1f64e-1f3fc",
        "name": "person with pouting face tone2",
        "shortname": ":person_with_pouting_face_tone2:"
    },
    {
        "key": "person_with_pouting_face_tone3",
        "unicode": "1f64e-1f3fd",
        "name": "person with pouting face tone3",
        "shortname": ":person_with_pouting_face_tone3:"
    },
    {
        "key": "person_with_pouting_face_tone4",
        "unicode": "1f64e-1f3fe",
        "name": "person with pouting face tone4",
        "shortname": ":person_with_pouting_face_tone4:"
    },
    {
        "key": "person_with_pouting_face_tone5",
        "unicode": "1f64e-1f3ff",
        "name": "person with pouting face tone5",
        "shortname": ":person_with_pouting_face_tone5:"
    },
    {
        "key": "person_frowning_tone1",
        "unicode": "1f64d-1f3fb",
        "name": "person frowning tone 1",
        "shortname": ":person_frowning_tone1:"
    },
    {
        "key": "person_frowning_tone2",
        "unicode": "1f64d-1f3fc",
        "name": "person frowning tone 2",
        "shortname": ":person_frowning_tone2:"
    },
    {
        "key": "person_frowning_tone3",
        "unicode": "1f64d-1f3fd",
        "name": "person frowning tone 3",
        "shortname": ":person_frowning_tone3:"
    },
    {
        "key": "person_frowning_tone4",
        "unicode": "1f64d-1f3fe",
        "name": "person frowning tone 4",
        "shortname": ":person_frowning_tone4:"
    },
    {
        "key": "person_frowning_tone5",
        "unicode": "1f64d-1f3ff",
        "name": "person frowning tone 5",
        "shortname": ":person_frowning_tone5:"
    },
    {
        "key": "haircut_tone1",
        "unicode": "1f487-1f3fb",
        "name": "haircut tone 1",
        "shortname": ":haircut_tone1:"
    },
    {
        "key": "haircut_tone2",
        "unicode": "1f487-1f3fc",
        "name": "haircut tone 2",
        "shortname": ":haircut_tone2:"
    },
    {
        "key": "haircut_tone3",
        "unicode": "1f487-1f3fd",
        "name": "haircut tone 3",
        "shortname": ":haircut_tone3:"
    },
    {
        "key": "haircut_tone4",
        "unicode": "1f487-1f3fe",
        "name": "haircut tone 4",
        "shortname": ":haircut_tone4:"
    },
    {
        "key": "haircut_tone5",
        "unicode": "1f487-1f3ff",
        "name": "haircut tone 5",
        "shortname": ":haircut_tone5:"
    },
    {
        "key": "massage_tone1",
        "unicode": "1f486-1f3fb",
        "name": "face massage tone 1",
        "shortname": ":massage_tone1:"
    },
    {
        "key": "massage_tone2",
        "unicode": "1f486-1f3fc",
        "name": "face massage tone 2",
        "shortname": ":massage_tone2:"
    },
    {
        "key": "massage_tone3",
        "unicode": "1f486-1f3fd",
        "name": "face massage tone 3",
        "shortname": ":massage_tone3:"
    },
    {
        "key": "massage_tone4",
        "unicode": "1f486-1f3fe",
        "name": "face massage tone 4",
        "shortname": ":massage_tone4:"
    },
    {
        "key": "massage_tone5",
        "unicode": "1f486-1f3ff",
        "name": "face massage tone 5",
        "shortname": ":massage_tone5:"
    },
    {
        "key": "rowboat_tone1",
        "unicode": "1f6a3-1f3fb",
        "name": "rowboat tone 1",
        "shortname": ":rowboat_tone1:"
    },
    {
        "key": "rowboat_tone2",
        "unicode": "1f6a3-1f3fc",
        "name": "rowboat tone 2",
        "shortname": ":rowboat_tone2:"
    },
    {
        "key": "rowboat_tone3",
        "unicode": "1f6a3-1f3fd",
        "name": "rowboat tone 3",
        "shortname": ":rowboat_tone3:"
    },
    {
        "key": "rowboat_tone4",
        "unicode": "1f6a3-1f3fe",
        "name": "rowboat tone 4",
        "shortname": ":rowboat_tone4:"
    },
    {
        "key": "rowboat_tone5",
        "unicode": "1f6a3-1f3ff",
        "name": "rowboat tone 5",
        "shortname": ":rowboat_tone5:"
    },
    {
        "key": "swimmer_tone1",
        "unicode": "1f3ca-1f3fb",
        "name": "swimmer tone 1",
        "shortname": ":swimmer_tone1:"
    },
    {
        "key": "swimmer_tone2",
        "unicode": "1f3ca-1f3fc",
        "name": "swimmer tone 2",
        "shortname": ":swimmer_tone2:"
    },
    {
        "key": "swimmer_tone3",
        "unicode": "1f3ca-1f3fd",
        "name": "swimmer tone 3",
        "shortname": ":swimmer_tone3:"
    },
    {
        "key": "swimmer_tone4",
        "unicode": "1f3ca-1f3fe",
        "name": "swimmer tone 4",
        "shortname": ":swimmer_tone4:"
    },
    {
        "key": "swimmer_tone5",
        "unicode": "1f3ca-1f3ff",
        "name": "swimmer tone 5",
        "shortname": ":swimmer_tone5:"
    },
    {
        "key": "surfer_tone1",
        "unicode": "1f3c4-1f3fb",
        "name": "surfer tone 1",
        "shortname": ":surfer_tone1:"
    },
    {
        "key": "surfer_tone2",
        "unicode": "1f3c4-1f3fc",
        "name": "surfer tone 2",
        "shortname": ":surfer_tone2:"
    },
    {
        "key": "surfer_tone3",
        "unicode": "1f3c4-1f3fd",
        "name": "surfer tone 3",
        "shortname": ":surfer_tone3:"
    },
    {
        "key": "surfer_tone4",
        "unicode": "1f3c4-1f3fe",
        "name": "surfer tone 4",
        "shortname": ":surfer_tone4:"
    },
    {
        "key": "surfer_tone5",
        "unicode": "1f3c4-1f3ff",
        "name": "surfer tone 5",
        "shortname": ":surfer_tone5:"
    },
    {
        "key": "bath_tone1",
        "unicode": "1f6c0-1f3fb",
        "name": "bath tone 1",
        "shortname": ":bath_tone1:"
    },
    {
        "key": "bath_tone2",
        "unicode": "1f6c0-1f3fc",
        "name": "bath tone 2",
        "shortname": ":bath_tone2:"
    },
    {
        "key": "bath_tone3",
        "unicode": "1f6c0-1f3fd",
        "name": "bath tone 3",
        "shortname": ":bath_tone3:"
    },
    {
        "key": "bath_tone4",
        "unicode": "1f6c0-1f3fe",
        "name": "bath tone 4",
        "shortname": ":bath_tone4:"
    },
    {
        "key": "bath_tone5",
        "unicode": "1f6c0-1f3ff",
        "name": "bath tone 5",
        "shortname": ":bath_tone5:"
    },
    {
        "key": "basketball_player_tone1",
        "unicode": "26f9-1f3fb",
        "name": "person with ball tone 1",
        "shortname": ":basketball_player_tone1:"
    },
    {
        "key": "basketball_player_tone2",
        "unicode": "26f9-1f3fc",
        "name": "person with ball tone 2",
        "shortname": ":basketball_player_tone2:"
    },
    {
        "key": "basketball_player_tone3",
        "unicode": "26f9-1f3fd",
        "name": "person with ball tone 3",
        "shortname": ":basketball_player_tone3:"
    },
    {
        "key": "basketball_player_tone4",
        "unicode": "26f9-1f3fe",
        "name": "person with ball tone 4",
        "shortname": ":basketball_player_tone4:"
    },
    {
        "key": "basketball_player_tone5",
        "unicode": "26f9-1f3ff",
        "name": "person with ball tone 5",
        "shortname": ":basketball_player_tone5:"
    },
    {
        "key": "lifter_tone1",
        "unicode": "1f3cb-1f3fb",
        "name": "weight lifter tone 1",
        "shortname": ":lifter_tone1:"
    },
    {
        "key": "lifter_tone2",
        "unicode": "1f3cb-1f3fc",
        "name": "weight lifter tone 2",
        "shortname": ":lifter_tone2:"
    },
    {
        "key": "lifter_tone3",
        "unicode": "1f3cb-1f3fd",
        "name": "weight lifter tone 3",
        "shortname": ":lifter_tone3:"
    },
    {
        "key": "lifter_tone4",
        "unicode": "1f3cb-1f3fe",
        "name": "weight lifter tone 4",
        "shortname": ":lifter_tone4:"
    },
    {
        "key": "lifter_tone5",
        "unicode": "1f3cb-1f3ff",
        "name": "weight lifter tone 5",
        "shortname": ":lifter_tone5:"
    },
    {
        "key": "bicyclist_tone1",
        "unicode": "1f6b4-1f3fb",
        "name": "bicyclist tone 1",
        "shortname": ":bicyclist_tone1:"
    },
    {
        "key": "bicyclist_tone2",
        "unicode": "1f6b4-1f3fc",
        "name": "bicyclist tone 2",
        "shortname": ":bicyclist_tone2:"
    },
    {
        "key": "bicyclist_tone3",
        "unicode": "1f6b4-1f3fd",
        "name": "bicyclist tone 3",
        "shortname": ":bicyclist_tone3:"
    },
    {
        "key": "bicyclist_tone4",
        "unicode": "1f6b4-1f3fe",
        "name": "bicyclist tone 4",
        "shortname": ":bicyclist_tone4:"
    },
    {
        "key": "bicyclist_tone5",
        "unicode": "1f6b4-1f3ff",
        "name": "bicyclist tone 5",
        "shortname": ":bicyclist_tone5:"
    },
    {
        "key": "mountain_bicyclist_tone1",
        "unicode": "1f6b5-1f3fb",
        "name": "mountain bicyclist tone 1",
        "shortname": ":mountain_bicyclist_tone1:"
    },
    {
        "key": "mountain_bicyclist_tone2",
        "unicode": "1f6b5-1f3fc",
        "name": "mountain bicyclist tone 2",
        "shortname": ":mountain_bicyclist_tone2:"
    },
    {
        "key": "mountain_bicyclist_tone3",
        "unicode": "1f6b5-1f3fd",
        "name": "mountain bicyclist tone 3",
        "shortname": ":mountain_bicyclist_tone3:"
    },
    {
        "key": "mountain_bicyclist_tone4",
        "unicode": "1f6b5-1f3fe",
        "name": "mountain bicyclist tone 4",
        "shortname": ":mountain_bicyclist_tone4:"
    },
    {
        "key": "mountain_bicyclist_tone5",
        "unicode": "1f6b5-1f3ff",
        "name": "mountain bicyclist tone 5",
        "shortname": ":mountain_bicyclist_tone5:"
    },
    {
        "key": "horse_racing_tone1",
        "unicode": "1f3c7-1f3fb",
        "name": "horse racing tone 1",
        "shortname": ":horse_racing_tone1:"
    },
    {
        "key": "horse_racing_tone2",
        "unicode": "1f3c7-1f3fc",
        "name": "horse racing tone 2",
        "shortname": ":horse_racing_tone2:"
    },
    {
        "key": "horse_racing_tone3",
        "unicode": "1f3c7-1f3fd",
        "name": "horse racing tone 3",
        "shortname": ":horse_racing_tone3:"
    },
    {
        "key": "horse_racing_tone4",
        "unicode": "1f3c7-1f3fe",
        "name": "horse racing tone 4",
        "shortname": ":horse_racing_tone4:"
    },
    {
        "key": "horse_racing_tone5",
        "unicode": "1f3c7-1f3ff",
        "name": "horse racing tone 5",
        "shortname": ":horse_racing_tone5:"
    },
    {
        "key": "spy_tone1",
        "unicode": "1f575-1f3fb",
        "name": "sleuth or spy tone 1",
        "shortname": ":spy_tone1:"
    },
    {
        "key": "spy_tone2",
        "unicode": "1f575-1f3fc",
        "name": "sleuth or spy tone 2",
        "shortname": ":spy_tone2:"
    },
    {
        "key": "spy_tone3",
        "unicode": "1f575-1f3fd",
        "name": "sleuth or spy tone 3",
        "shortname": ":spy_tone3:"
    },
    {
        "key": "spy_tone4",
        "unicode": "1f575-1f3fe",
        "name": "sleuth or spy tone 4",
        "shortname": ":spy_tone4:"
    },
    {
        "key": "spy_tone5",
        "unicode": "1f575-1f3ff",
        "name": "sleuth or spy tone 5",
        "shortname": ":spy_tone5:"
    },
    {
        "key": "tone1",
        "unicode": "1f3fb",
        "name": "emoji modifier Fitzpatrick type-1-2",
        "shortname": ":tone1:"
    },
    {
        "key": "tone2",
        "unicode": "1f3fc",
        "name": "emoji modifier Fitzpatrick type-3",
        "shortname": ":tone2:"
    },
    {
        "key": "tone3",
        "unicode": "1f3fd",
        "name": "emoji modifier Fitzpatrick type-4",
        "shortname": ":tone3:"
    },
    {
        "key": "tone4",
        "unicode": "1f3fe",
        "name": "emoji modifier Fitzpatrick type-5",
        "shortname": ":tone4:"
    },
    {
        "key": "tone5",
        "unicode": "1f3ff",
        "name": "emoji modifier Fitzpatrick type-6",
        "shortname": ":tone5:"
    }
];

export default emojis;