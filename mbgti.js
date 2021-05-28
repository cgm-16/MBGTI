var lstResults = new Array();
var n = 1;

var gunUrls = [
    "./results/jdn.png", "./results/jdy.png"
    , "./results/jjn.png", "./results/jjy.png"
    , "./results/ydn.png", "./results/ydy.png"
    , "./results/yjn.png", "./results/yjy.png"   
];

var quizUrls = [
    "./bg/mbgti.png", "./bg/mbgti2.png"
    , "./bg/mbgti3.png" , "./bg/mbgti4.png"
    , "./bg/mbgti5.png", "./bg/mbgti6.png"
    , "./bg/mbgti7.png", "./bg/mbgti8.png"
    , "./bg/mbgti9.png"
];

var prob = [
    "비행기에서 떨어질 때?", "근처에 보급품이<br>떨어지면?"
    , "상대방은 나를 보지<br>못했고, 나만 상대방을<br>포착한 상황!!"
    , "내 팀원이<br>위험한 위치에 있는 것을<br>봤을 때 나는?"
    , "우리 팀이<br>교전을 준비할 때,<br>나는?"
    , "둘 중 하나를<br>무조건 버려야 할 때<br>내가 먼저 버릴 것은?"
    , "기절한 팀원이 '헬프!'를<br>외치면 나는?"
    , "치킨을 아쉽게 놓쳤을때?"
    , "이번 판<br>막판하려고 했는데,<br>허무하게 죽었다면?"
];

var quizAB = [
    {A: "고민은 무슨, 랜드마크가 국룰이지~", B: "오래 살고 봐야 하는 거 아님? 짤파밍 ㄱㄱ"}
    , {A: "보급은 못참지ㅎ 줍줍", B: "사람들 몰리겠네;; 튀튀"}
    , {A: "바아~로 킬 추가하러 가야지~", B: "일단 멈춰! 괜히 나서면 안 돼,,"}
    , {A: "나만 믿어! 달려 가서 적을 손봐주기!", B: "위험에 처한 팀원을 구해주기 위해 연막탄 던져주기!"}
    , {A: "운전 실력 뽐내며 교전지역 정찰하기", B: "언덕 타고 올라가서 팀의 시야 넓혀주기"}
    , {A: "힐템을 버린다", B: "총알탄을 버린다"}
    , {A: "인생은 실전ㅇㅇ 쟤를 살리는 게 이득인지 빠르게 따져본다", B: "의리에 죽고 의리에 사는 나! 일단 몸이 반응한다"}
    , {A: "나 왜 졌지? 그때 그렇게 했어야했나? 머리속으로 시뮬레이션 백만번 돌림", B: "머선129...3초간 멍때리고 바로 다음판 돌림"}
    , {A: "막판으로 맘 정했으면 그대로 끝내야지~(끈다)", B: "아,, 담판 무조건 치킨먹을 각인데,, 한판 더 기?"}
];

var vidUrl = [
    "https://youtu.be/SxxbptHm_I0?t=11741", "https://youtu.be/UvkbcAg-HmU?t=11069"
    , "https://youtu.be/SxxbptHm_I0?t=5262" ,"https://youtu.be/UvkbcAg-HmU?t=3143"
    , "https://youtu.be/SxxbptHm_I0?t=1012" , "https://youtu.be/SxxbptHm_I0?t=1243"
    , "https://youtu.be/UvkbcAg-HmU?t=10647" , "https://youtu.be/B83dvSRcWWc?t=7896"
];

// 이하 공유 버튼
var url_default_ks = "https://story.kakao.com/share?url=";
var url_default_fb = "https://www.facebook.com/sharer/sharer.php?u=";
var url_default_tw_txt = "https://twitter.com/intent/tweet?text="; 
var url_default_tw_url = "&url="; 
var title_default_naver = "&title="; 
var url_this_page = location.href; 
var title_this_page = document.title;
var url_combine_ks = url_default_ks + url_this_page; 
var url_combine_fb = url_default_fb + url_this_page;
var url_combine_tw = url_default_tw_txt + document.title + url_default_tw_url + url_this_page;
var url_combine_naver = "https://cafe.naver.com/ca-fe/cafes/29359582/menus/134/articles/write?boardType=L";

Kakao.init("32a2b2467144d8c6d140e168c067afc8");

function startQuiz() {
    $("#startPg").hide();
    $("#mbgti").show();
    nextQue(0);
}

function choose(ans) {
    if (n <= 8) {
        nextQue(n)
        lstResults.push(`q${n}=${ans}`);
        n++;
        console.log(lstResults);
    } else {
        lstResults.push(`q${n}=${ans}`);
        console.log(lstResults);
        showResults();
    }
}

function nextQue(n) {
    document.getElementById("bgframe").src = quizUrls[n];
    document.getElementById("probbox").innerHTML = prob[n];
    document.getElementById("A").innerText = quizAB[n]["A"];
    document.getElementById("B").innerText = quizAB[n]["B"];
}

function showResults() {
    var lstAnswers = lstResults.map(n => n[3]);
    var imgUrl = getGun(lstAnswers);
    document.getElementById("resultimg").src = imgUrl;
    $("#mbgti").hide();
    $("#result").show();
}

function getGun(lst) {
    var j = 0;
    var ch = 0;
    var c = 0;
    var isYp = false;
    var isCharge = false;
    var isCool = false;

    for (i = 0; i < 9; i++) {
        if(i < 3) {
            if (lst[i] === "1") {
                j++;
            }
        } else if(i > 6) {
            if (lst[i] === "1") {
                c++;
            }
        } else {
            if (lst[i] === "1") {
                ch++;
            }
        }
    }
    
    if (j >= 2) {
        isYp = true;
        document.getElementById("playerbtn").style.backgroundColor = "#94C9CD";
        document.getElementById("pmpsbtn").style.backgroundColor = "#94C9CD";
    } else {
        document.getElementById("playerbtn").style.backgroundColor = "#FE8D06";
        document.getElementById("pmpsbtn").style.backgroundColor = "#FE8D06";
    }

    if (ch >= 2) {
        isCharge = true;
    }

    if (c >= 2) {
        isCool = true;
    }

    if (!isYp && isCharge && isCool) {
        document.getElementById("playerbtn").href = vidUrl[0];
        return gunUrls[0];
    } else if (!isYp && isCharge && !isCool) {
        document.getElementById("playerbtn").href = vidUrl[1];
        return gunUrls[1];
    } else if (!isYp && !isCharge && isCool) {
        document.getElementById("playerbtn").href = vidUrl[2];
        return gunUrls[2];
    } else if (!isYp && !isCharge && !isCool) {
        document.getElementById("playerbtn").href = vidUrl[3];
        return gunUrls[3];
    } else if (isYp && isCharge && isCool) {
        document.getElementById("playerbtn").href = vidUrl[4];
        return gunUrls[4];
    } else if (isYp && isCharge && !isCool) {
        document.getElementById("playerbtn").href = vidUrl[5];
        return gunUrls[5];
    } else if (isYp && !isCharge && isCool) {
        document.getElementById("playerbtn").href = vidUrl[6];
        return gunUrls[6];
    } else {
        document.getElementById("playerbtn").href = vidUrl[7];
        return gunUrls[7];
    }
}

function copylink() {
    navigator.clipboard.writeText("https://pmps-luv-mbgti.netlify.app/")
}

function share(strUrl, strOptions) {
    if ( typeof window.open === "function") {
        return window.open(strUrl, "_blank", strOptions);
    } else {
        return location.href = strUrl;
    }
}

function sendLink() {
    Kakao.Link.sendScrap({
        requestUrl: 'https://pmps-luv-mbgti.netlify.app'
    });
}