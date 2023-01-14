var date_details={} //definiton at the end of the code
                    //dates is also defined at the last

var event_details = [
    {
        date : new Date(2022,10,3),
        name : "One drive",
        images_url : [ "https://dsm01pap002files.storage.live.com/y4miNjwBEAqbYxtdYAmGw3JBULFJwPnhfC6y6VDvdtGMveeBDDYsJTkbFS_WwfbD04M8e82P6NALI1MJgsip3y3y1D3PnsLS7JWAkLs2S9uJlhJLI4yhWbhEEPYiEw0EEspp2mSg6j1cDWo3cYCLqPb2yLU7Lr_GYn6lFKtulHk-PJhM648Zh29tL1Oimk0PcEDH14g-g6-h8JV-TjNc00mPttuvtX-_3egNzYj2lSyAzE?encodeFailures=1&width=399&height=887",
                       "https://dsm01pap002files.storage.live.com/y4mFQD1qv6PxLvI9tAvA225TmKcMhkeW9sfq7Waf6OHCqCSmMPaOn6Cur-31AJV-lfLmpgJdINCW3S7px1olXuf7XAauQhXcLlpqh9cnb-uUADM_4u5RwGiQ4mLtFyukTI9pQJIrBS7kKQXcg0w570pNLEIQ6Ie36ZMKv98ezxf3OzsXuKfigXiwHehxOVtuk7jCAEmEluPjKxoJ3BvifQvtUvgH3R-Wlp8taZXR0Y53Yw?encodeFailures=1&width=176&height=221",
                       "https://dsm01pap002files.storage.live.com/y4mS3CpFefYawVm5gzV66lgBY88QfVs4fxHsSUnjQa8149OJXXfBQZoOuVbF4p6c1J2tCBZmQlN-HHMu-lCBGOFX8AMtxrUrjpx73RqajTFxIf760QzAaz5j7K_jjwm9whAl7u2PjPHlhEJ9boqX3VXsvApdwN9t_mczTrwx3u5uQB6SzCTULywh_4ZmCoU1e4FFWrYYJq3ps0zvBzFH05ljRU4q60-FQ5sbn4Nhin-s2w?encodeFailures=1&width=399&height=887",
                       "https://dsm01pap002files.storage.live.com/y4mxetOLnDH-vSJ8MI1RxHKzrzddAst42Kc1ytm3DGLT89NsbIcz78lwYVhuFF_gGQARoavav8j5T1ClZd0gy2OvDiDIElIzO6QnvZwH-awRuA2YI9B4bcJxOv-IXS-Zibsmjpxf_ma6Vqxcp3ncjTtQlfH3H3q0OnA6NBx95VZwtK4xpuoeCIHsU-f6VJEAintD5y2sGWMLEeKSsh38Fsx46DQSoi772o4GT3l2STJ7zI?encodeFailures=1&width=296&height=221",
                       "https://dsm01pap002files.storage.live.com/y4mcn6VxMUmaaiMYa1Z2t9Cim7JXgRt8PudIPzhq3QKfVK0_a6_8RhwiMjUts7M2TedIsxeVzOCUk8AxNeDi8nYj1pXXKneACwwNiCtpEp_NQDYF8bFsQnN6LJzj27xKnDANQLfTCKWwjQ7eUevJr2gEo-OrzfuNJdAORIobzBmaOBR95FSMdXin2f2jMJX6upuuREF7-K2ZTK-yR3A6CqkH9k0RxZeaUvolKpnJQTbyNk?encodeFailures=1&width=663&height=887",
                    ],
        winners : {
            1:"ABC",
            2:"DEF",
            3:"GHI"
        },
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eaque eius corporis vel praesentium iusto, eos iste fuga, accusamus omnis debitis reprehenderit incidunt pariatur quia illum et doloribus? Quam, amet! ",
    },
    {
        date : new Date(2022,9,12),
        name : "Mind fest",
        images_url : ["https://imgs.search.brave.com/SCvO0J0kD6zRvEjJziE9f03-hHMP7_2FdfPEvC--Fw8/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9u/cWtkMGNSSVdMdy9t/YXhyZXNkZWZhdWx0/LmpwZw",
        "https://imgs.search.brave.com/-eVUkadOWrrULNYnc5zAjzU_ch_kWpZzwg21-r99FZY/rs:fit:820:500:1/g:ce/aHR0cHM6Ly9jZG4y/LmdpZ2FudGljLmNv/bS9zdGF0aWMvaW1h/Z2VzL2NhbXBhaWdu/LzgyMHg1MDAvbWlu/ZF9mZXN0LTU2MTM2/NDE0MTYuanBn",
                      "https://imgs.search.brave.com/is4aRLpsdhE4rSsGPn-dQs_lK_PhmY_G89hfPQzIdnU/rs:fit:679:960:1/g:ce/aHR0cDovL3d3dy5n/b2Rpc2ludGhldHZ6/aW5lLmNvLnVrL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDEzLzEx/L2NhcmRpZmZtaW5k/ZmVzdDIwMTMuanBn",
                      "https://imgs.search.brave.com/SpkNw-8Gino1g2iFMclTjTjINiIaPJtdJJQhcOCyBzs/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5U/TTZTTWIwVUlEMDY0/UldGX0x0V19BSGFF/SyZwaWQ9QXBp"],
        winners : {
            1:"XYZ",
            2:"PQRS",
            3:"NMO"
        },
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eaque eius corporis vel praesentium iusto, eos iste fuga, accusamus omnis debitis reprehenderit incidunt pariatur quia illum et doloribus? Quam, amet! ",
    },
    {
        date : new Date(2021,0,3),
        name : "Tech talk",
        images_url : ["https://imgs.search.brave.com/laOLg4m1wVXCpFIdH2oFOzz-uzTvbqAIczvoIQkLmOE/rs:fit:780:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5t/QkxUeWlTLVMxZmd4/aTdqS20zcXBnSGFF/ZyZwaWQ9QXBp",
                      "https://imgs.search.brave.com/RxGrIKyHQNb3LF4uWwcHt5CddwVaF6l3-aWsbKVfKzw/rs:fit:727:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5K/MzRTU25PWVNzbjBa/em1sd29NQ3NnSGFF/MSZwaWQ9QXBp",
                      "https://imgs.search.brave.com/UuiR7h83He1YAtR62FjL3E79BO5vkLmTSNJ1XbYoJyo/rs:fit:148:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/aGpyZGtMYjYwQ0Jn/cHRLVVR6cXdRQUFB/QSZwaWQ9QXBp"],
        guest : "Dr. Dinesh Kumar",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eaque eius corporis vel praesentium iusto, eos iste fuga, accusamus omnis debitis reprehenderit incidunt pariatur quia illum et doloribus? Quam, amet! ",
    },
    {
        date : new Date(2021,0,1),
        name : "Tech talk",
        images_url : ["https://imgs.search.brave.com/laOLg4m1wVXCpFIdH2oFOzz-uzTvbqAIczvoIQkLmOE/rs:fit:780:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5t/QkxUeWlTLVMxZmd4/aTdqS20zcXBnSGFF/ZyZwaWQ9QXBp",
                      "https://imgs.search.brave.com/RxGrIKyHQNb3LF4uWwcHt5CddwVaF6l3-aWsbKVfKzw/rs:fit:727:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5K/MzRTU25PWVNzbjBa/em1sd29NQ3NnSGFF/MSZwaWQ9QXBp",
                      "https://imgs.search.brave.com/UuiR7h83He1YAtR62FjL3E79BO5vkLmTSNJ1XbYoJyo/rs:fit:148:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/aGpyZGtMYjYwQ0Jn/cHRLVVR6cXdRQUFB/QSZwaWQ9QXBp"],
        guest : "Dr. Dinesh Kumar",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eaque eius corporis vel praesentium iusto, eos iste fuga, accusamus omnis debitis reprehenderit incidunt pariatur quia illum et doloribus? Quam, amet! ",
    },
    {
        date : new Date(2021,0,1),
        name : "Mind fest",
        images_url : ["https://imgs.search.brave.com/-eVUkadOWrrULNYnc5zAjzU_ch_kWpZzwg21-r99FZY/rs:fit:820:500:1/g:ce/aHR0cHM6Ly9jZG4y/LmdpZ2FudGljLmNv/bS9zdGF0aWMvaW1h/Z2VzL2NhbXBhaWdu/LzgyMHg1MDAvbWlu/ZF9mZXN0LTU2MTM2/NDE0MTYuanBn",
                      "https://imgs.search.brave.com/SCvO0J0kD6zRvEjJziE9f03-hHMP7_2FdfPEvC--Fw8/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9u/cWtkMGNSSVdMdy9t/YXhyZXNkZWZhdWx0/LmpwZw",
                      "https://imgs.search.brave.com/is4aRLpsdhE4rSsGPn-dQs_lK_PhmY_G89hfPQzIdnU/rs:fit:679:960:1/g:ce/aHR0cDovL3d3dy5n/b2Rpc2ludGhldHZ6/aW5lLmNvLnVrL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDEzLzEx/L2NhcmRpZmZtaW5k/ZmVzdDIwMTMuanBn",
                      "https://imgs.search.brave.com/SpkNw-8Gino1g2iFMclTjTjINiIaPJtdJJQhcOCyBzs/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5U/TTZTTWIwVUlEMDY0/UldGX0x0V19BSGFF/SyZwaWQ9QXBp"],
        winners : {
            1:"XYZ",
            2:"PQRS",
            3:"NMO"
        },
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eaque eius corporis vel praesentium iusto, eos iste fuga, accusamus omnis debitis reprehenderit incidunt pariatur quia illum et doloribus? Quam, amet! ",
    },
]

for(var i in event_details)
{
    date_details[event_details[i].date] = date_details[event_details[i].date] || [];
    date_details[event_details[i].date].push(event_details[i]);
}

export const dates = date_details;