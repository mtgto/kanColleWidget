/***** class definition *****/

/* static */
var Constants = {/** constantアクセサ的なアレ **/
    time :{
        mission : {
             "1" : 15,
             "2" : 30,
             "3" : 20,
             "4" : 50,
             "5" : 90,
             "6" : 40,
             "7" : 60,
             "8" : 180,
             "9" : 240,
            "10" : 90,
            "11" : 300,
            "12" : 480,
            "13" : 240,
            "14" : 360,
            "15" : 720,
            "16" : 900,
            "17" : 45,
            "18" : 300,
            "19" : 360,
            "20" : 120,
            "25" : 2400,
            "26" : 4800,
            "27" : 1200
        },
        notifyOffset : 50 * 1000 //50秒
    },
    widget : {
        title : {
            rate : 0.99,
            default : [
                "艦これウィジェット",
                "艦これウィジェット",
                "艦これウィジェット",
                "艦これウィジェット",
                "あかつきの水平線に勝利を刻むのです",
            ],
            special : [ // セリフ。
                "クマ？",
                "勝利を！　提督に！",
                "ひえ〜",
                "紅茶が飲みたいネー",
                "五航戦の子なんかと一緒にしないで",
                "嬉しいわ、もっと働ける！",
                "...知らない子ですね",
                "駆逐艦？あぁ...ウザい。",
                "いいねぇ、しびれるねぇ。ありがとねっ",
                "艦これウィジェットが使いづらくっても、那珂ちゃんのことは嫌いにならないでください！"
            ]
        },
        width : {
            '1200': {
                zoom : '1.5',
                mode : 'l'
            },
            '800' : {
                zoom : '1',
                mode : 'm'
            },
            '600' : {
                zoom : '0.75',
                mode : 's'
            },
            '400' : {
                zoom : '0.5',
                mode : 'xs'
            }
        },
        aspect : 0.6
    },
    popup : {
      title : "提督 仕事しろ"
    },
    notification : {
        title : "艦これウィジェット",
        img : './icon.png',
        mission : {
            end_prefix : "第",
            end_suffix : "艦隊がまもなく帰投します"
        },
        createship : {
            end_prefix : "第",
            end_suffix : "建造ドックでの建造作業がまもなく完了します"
        },
        nyukyo : {
            end_prefix : "第",
            end_suffix : "入渠ドックの修復作業がまもなく完了します"
        }
    },
    achievements : {
        'mission_count'   : '遠征',
        'createship_count': '建造',
        'createitem_count': '開発',
        'map_count'       : '出撃',
        'hokyu_count'     : '補給',
        'kaisou_count'    : '近改',
        'practice_count'  : '演習'
    },

    trimmingParamsMapping : {
        'createship' : {
            size : {
                width  : (1/8),
                height : (1/32)
            },
            coords : [
                {
                    left : (0.49),
                    top : (0.225)
                }
            ]
        }
    },

    ensurementMap : {
        '()' : '0',
        'O'  : '0',
        'I'  : '1',
        'i'  : '1',
        'Z'  : '2',
        'S'  : '5',
        'q'  : '9'
    }
};
