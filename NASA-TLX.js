// Create a set of parallel arrays for each of the scales
var scale      = new Array();
var left       = new Array();
var right      = new Array();
var def        = new Array();
var NUM_SCALES = 6;

scale[0]  = "知的・知覚的要求"; 
left[0]   = "小さい";
right[0]  = "大きい";
def[0]    = "<p>どの程度の知的・知覚的活動(考える、決める、計算する、記憶する、見るなど)を必要としましたか。<br>課題はやさしかったですか。それとも難しかったですか。<br>単純でしたか。それとも複雑でしたか。<br>正確さが求められましたか。それとも大ざっぱでよかったですか。</p>";

scale[1]  = "身体的要求"; 
left[1]   = "小さい";
right[1]  = "大きい";
def[1]    = "<p>どの程度の身体的活動(押す、引く、回す、制御する、動き回るなど)を必要としましたか。<br>作業はラクでしたか。それともキツかったですか。<br>ゆっくりできましたか。それともキビキビやらなければなりませんでしたか。<br>休み休みできましたか。それとも働きづめでしたか。</p>";

scale[2]  = "タイムプレッシャー"; 
left[2]   = "弱い";
right[2]  = "強い";
def[2]    = "<p>仕事のペースや課題が発生する頻度のために感じる時間的切迫感はどの程度でしたか。<br>ペースはゆっくりとして余裕があるものでしたか。それとも速くて余裕のないものでしたか。</p>";

scale[3]  = "作業成績"; 
left[3]   = "良い";
right[3]  = "悪い";
def[3]    = "<p>作業指示者によって設定された課題の目標をどの程度達成できたと思いますか。<br>目標の達成に関して自分の作業成績にどの程度満足していますか。</p>";

scale[4]  = "努力"; 
left[4]   = "少ない";
right[4]  = "多い";
def[4]    = "<p>作業成績のレベルを達成・維持するために、精神的・身体的にどの程度一生懸命に作業しなければなりませんでしたか。</p>";

scale[5]  = "フラストレーション"; 
left[5]   = "低い";
right[5]  = "高い";
def[5]    = "<p>作業中に、不安感、落胆、いらいら、ストレス、悩みをどの程度感じましたか。あるいは逆に、安心感、満足感、充足感、楽しさ、リラックスをどの程度感じましたか。</p>";

window.addEventListener('load', OnLoad);
function OnLoad() {}

// Pairs of factors in order in the original instructions, numbers
// refer to the index in the scale, left, right, def arrays.
let pair = new Array();
pair[0]   = "4 3";
pair[1]   = "2 5";
pair[2]   = "2 4";
pair[3]   = "1 5";
pair[4]   = "3 5";
pair[5]   = "1 2";
pair[6]   = "1 3";
pair[7]   = "2 0";
pair[8]   = "5 4";
pair[9]   = "3 0";
pair[10]  = "3 2";
pair[11]  = "0 4";
pair[12]  = "0 1";
pair[13]  = "4 1";
pair[14]  = "5 0";

// Variable where the results end up
let results_rating = new Array();
let results_tally  = new Array();
for (let i = 0; i < NUM_SCALES; i++) results_tally[i] = 0;
let results_weight = new Array();
let results_overall;
let pair_num = 0;



function clicked1() {
	//alert("次に15の質問をします。それぞれで、どちらがより作業負荷に直結した要因か選んでください。");
	results_rating[0] = Math.floor(document.getElementById("mental").value / 5) * 5;
	results_rating[1] = Math.floor(document.getElementById("physical").value / 5) * 5;
	results_rating[2] = Math.floor(document.getElementById("temporal").value / 5) * 5;
	results_rating[3] = Math.floor(document.getElementById("performance").value / 5) * 5;
	results_rating[4] = Math.floor(document.getElementById("effort").value / 5) * 5;
	results_rating[5] = Math.floor(document.getElementById("frustration").value / 5) * 5;
	// let str = `<h3>${results_rating.join(", ")}</h3>`;
	// let element = document.getElementById("div2");
	// element.insertAdjacentHTML("afterbegin", str);

	document.getElementById("div1").style.display = "none";
	document.getElementById("div2").style.display = "";
	setPairLabels();
}

function setPairLabels(){
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");

	var pair1 = scale[indexes[0]];
	var pair2 = scale[indexes[1]];

	document.getElementById('pair1').value = pair1;
	document.getElementById('pair2').value = pair2;

	document.getElementById('pair1_def').innerHTML = def[indexes[0]];
	document.getElementById('pair2_def').innerHTML = def[indexes[1]];
}

// They clicked the top pair button
function buttonPair1()
{
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");
	results_tally[indexes[0]]++;

	nextPair();
	return true;
}

function buttonPair2()
{
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");
	results_tally[indexes[1]]++;	
	nextPair();
	return true;
}

// Move to the next pair
function nextPair()
{
	pair_num++;
	if (pair_num >= 15)
	{
		document.getElementById('div2').style.display = 'none';
		document.getElementById('div3').style.display = '';
		calcResults();
        console.log(getResultsHTML())
        const scoredata = getResultsHTML();
		document.getElementById('score').value=scoredata;
        //const scorearea = document.getElementById('score');
        const button = document.getElementById('copybutton');

        button.addEventListener('click', () => {
          if (!navigator.clipboard) {
            alert("このブラウザは対応していません");
            return;
          }

          navigator.clipboard.writeText(scoredata).then(
            () => {
              alert('文章をコピーしました。');
            },
            () => {
              alert('コピーに失敗しました。');
            });
        });
	}
	else
	{
		setPairLabels();
	}
}

// Compute the weights and the final score
function calcResults()
{
	results_overall = 0.0;

	for (var i = 0; i < NUM_SCALES; i++)
	{
		results_weight[i] = results_tally[i] / 15.0;
		results_overall += results_weight[i] * results_rating[i];
	}
}

// Output the table of results
function getResultsHTML()
{
	var result = "";
	for (var i = 0; i < NUM_SCALES; i++)
	{
		result += "\n";
		result += scale[i];
		result += ",";


		result += results_rating[i];
		result += ",";

		result += results_tally[i];
		result += ",";

		result += "";
		result += results_weight[i];
		result += ",";
	}

	result += "\n";
	result += "総合スコア,";
	result += results_overall;
	result += ",";

	return result;
}
