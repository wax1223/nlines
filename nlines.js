var lineSymbol = '|';
function fold(x, pos)
{
    var len = x.length; 
    var halflen = Math.floor(len / 2);
    
    if(pos < halflen)
    {
        return x.slice(pos + 1);
    }
    else
    {
        return x.slice(0, pos); //[start, end)
    }
}

function isFeasibaleFold(str, pos)
{
    var len = str.length;
    var halflen = Math.floor(len / 2);
    var start = 0;
    var end = 0;
    if(pos < halflen)
    {
        start = 0; end = pos * 2;
    }
    else
    {
        end = len - 1;
        start = 2 * pos - end; 
    }

    while(start != end)
    {
        if(str[start++] != str[end--])
        {
            return false;
        }
    }
    return true;
}

function cmp(a, b)
{
    var lena = a.length
    var lenb = b.length
    if(lena < lenb) return -1
    if(lena > lenb) return 1
    return 0
}
function nlinesFold(str)
{
    if(str.length <= 0) 
    {
        var a = [];
        foldSeq.forEach(x => a.push(x));
        res.push(a);
        return;
    }
    for (var i = 0; i < str.length; i++)
    {
        if(isFeasibaleFold(str, i))
        {
            foldSeq.push(i);
            var newstr = fold(str, i)
            nlinesFold(newstr);
            foldSeq.pop();
        }
    }
}

function nlinesFold2(str, begin, end)
{
    var center =  Math.floor((end - begin) / 2) + begin;
    if(str.length <= 0) 
    {
        if(foldSeq.length <= shortestPath)
        {
            shortestPath = Math.min(shortestPath, foldSeq.length);
            var a = [];
            foldSeq.forEach(x => a.push(x));
            res.push(a);
        }
        return;
    }
    for (var i = 0; i < str.length; i++)
    {
        if(isFeasibaleFold(str, i))
        {
            var pos = i + begin;
            foldSeq.push(pos);
            var newstr = fold(str, i)
            if(pos < center)
            {
                nlinesFold2(newstr, pos + 1, end);
            }
            else
            {
                nlinesFold2(newstr, begin, pos);
            }
            foldSeq.pop();
        }
    }
}

var foldSeq = []
var res = []
var last_fold = 0;
var shortestPath = 1000000;

function slove(str, noOuput) 
{
    noOuput = noOuput || false;
    foldSeq = []
    res = []
    // nlinesFold(str, 0)
    shortestPath = 1000000;
    nlinesFold2(str, 0, str.length);
    res.sort(cmp);
    if(noOuput) return res[0].length;
    var seqforReading = [];

    var result = res[0]
    var counter = 1;
    
    res.map(function(e, i, a)
    {
        if(e.length == result.length)
        { 
            if(counter >= 50)
            {
                if(counter == 50)
                {
                    printArr("Too much ...", [], 'text', 'outputTable');
                }
            }
            else 
            {  
                printArr("Fold " + counter , e, 'text', 'outputTable');
            }
            counter++;
        }
    });
    var table = document.getElementById("outputTable")
    table.children[0].textContent = "Output(mimial(" + result.length + ") ways(" + (counter - 1) + "), total(" + res.length + "))";
    return res[0].length;
}

function strToArr(str)
{
    var arr = [];
    [...str].forEach(function (e)
    {
        arr.push(e);
    })
    return arr;
}

function printArr(id , arr, tdclass, outputTable)
{
    tdclass = tdclass || "text";
    outputTable = outputTable || "arrTable";

    var tr = document.getElementById(id);
    var tableBody = document.getElementById(outputTable).children[1];
    if(!tr)
    {
        tr = document.createElement("tr");
        tr.setAttribute("id", id);
        tableBody.append(tr);
    }   
    tr.innerHTML = '<td>' + id + '</td>' + arr.map(function(elmt, i, arr)
    {
        return '<td class="' + tdclass + '">' + elmt + '</td>'
    }).join(" ");
}


function output(str, str_new, p)
{
    var parr = document.getElementById('array');
    var pseq = document.getElementById('seq');
    var pstr_new = document.getElementById('str_new');
    var pstr = document.getElementById('str');
    var phash_str = document.getElementById('hash_str');
    var phash = document.getElementById('hash');
    var ponlyStrseq = document.getElementById("onlyStrseq");
    var ponlystr = document.getElementById('onlyStr')
    var ponly = document.getElementById('only');
    // pstr.innerHTML = str.join(" ");

    pstr_new.innerHTML = "<td>Line and Distance</td>" + str_new.map(function (x) {
        if (x == lineSymbol)
        {
            return '<td class="text linetext">' + x + '</td>';
        }
        else
        {
            return '<td class="text distanceText">' + x + '</td>';
        }
    }).join(" ");

    printArr("Palindrome", p, 'text', 'table');
    var retArr = []
    p.map(function(e, i, a)
    {
        if(i % 2)
        {
            retArr.push(e - 1);
        }
    })
    printArr("Input Array", str, "text lineText");
    printArr('Palindrome array', retArr);
    // parr.innerHTML = "<td>Palindrome array</td>" + p.map(x => '<td class="text">' + x + '</td>').join(" ");
    // phash_str.innerHTML = "<td>fold point at lines</td>" + str_new.map(function (x) {
    //     if (x == lineSymbol) {
    //         return '<td class="text lineText">' + x + '</td>';
    //     }
    //     else {
    //         return '<td class="text"> </td>';
    //     }
    // }).join(" ");

    // phash.innerHTML = "<td>Palindrome array</td>" + p.map(function (e, i) {
    //     if (!(i % 2)) {
    //         return '<td class="text">' + e + '</td>';
    //     }
    //     else {
    //         return '<td class="text"> </td>';
    //     }
    // }).join(" ")
    /*
    ponlyStrseq.innerHTML = "<td>Sequence</td>" + str_new.map(function(element, index, arr)
    {
        if (index % 2) 
        {
            return '<td class="text">' + (index - 1) / 2  + '</td>';
        }
        else 
        {
            return '<td class="text"> </td>';
        }
    }).join(" ")

    ponlystr.innerHTML = "<td>Fold point at paper</td>" + str_new.map(function (x) {
        if (x == lineSymbol || x == '$') {
            return '<td class="text"> </td>';
        }
        else {
            return '<td class="text distanceText">' + x + ' </td>';
        }
    }).join(" ");

    ponly.innerHTML = "<td>Palindrome Array</td>" + p.map(function (e, i) {
        if (i % 2) 
        {
            return '<td class="text">' + (e - 1) + '</td>';
        }
        else {
            return '<td class="text"> </td>';
        }
    }).join(" ")
    */
}

function Manacher(str)
{
    var str_new = [];
    var p = new Array(0);
    str_new.push('$');
    str_new.push(lineSymbol);
    
    str.forEach(function(item)
    {
        str_new.push(item);
        str_new.push(lineSymbol)    
    });
    str_new.forEach(function(element, index, Array){
        p.push(0);
    })

    var len = str_new.length;  // 取得新字符串长度并完成向 str_new 的转换
    //var max_len = -1;  // 最长回文长度

    var id;
    var mx = 0;

    for (var i = 1; i < len; i++)
    {
        if (i < mx)
            p[i] = Math.min(p[2 * id - i], mx - i);  // 需搞清楚上面那张图含义, mx 和 2*id-i 的含义
        else
            p[i] = 1;

        while (str_new[i - p[i]] == str_new[i + p[i]])  // 不需边界判断，因为左有'$',右有'\0'
            p[i]++;

        // 我们每走一步 i，都要和 mx 比较，我们希望 mx 尽可能的远，这样才能更有机会执行 if (i < mx)这句代码，从而提高效率
        if (mx < i + p[i])
        {
            id = i;
            mx = i + p[i];
        }
    }
    return [p.slice(1), str_new.slice(1)];
}

function getPLeftMost(Arr)
{
    var retArr = [];
    Arr.forEach(function(){
        retArr.push(0);
    });
    var palindromeLen = 0;
    var pleft = 0
    for(var i = 0; i < Arr.length; i++)
    {
        palindromeLen = Arr[i];
        pleft = (palindromeLen - 1) / 2;
        for(var j = i - pleft ; j <= i; j++)
        {
            retArr[j] = Math.max(1 + pleft--, retArr[j]);
        }
    }
    return retArr;
}

function getPRightMost(Arr)
{
    var retArr = [];
    Arr.forEach(function(){
        retArr.push(0);
    });
    var palindromeLen = 0;
    var pright = 0
    for(var i = 0; i < Arr.length; i++)
    {
        palindromeLen = Arr[i];
        pright = (palindromeLen - 1) / 2;
        for(var j = i + pright ; j >= i; j--)
        {
            retArr[j] = Math.max(1 + pright--, retArr[j]);
        }
    }
    return retArr;
}
var PLeftMost;

var Lmatrix;
function GetPalindrome(Generatestr) 
{
    var isoutput = false;
    var inputStr = Generatestr
    if(!Generatestr)
    {
        isoutput = true;
        var iptstr = document.getElementById('inputStr');
        inputStr = iptstr.value;
        if(inputStr == '') return;
    }
    
    var strl = strToArr(inputStr);
    var retArr = Manacher(strl);


    var p = retArr[0];
    var str_new = retArr[1];
    var seq = [];
    strl.map(function(e, i, a) 
    {
        seq.push(i);
    })
    
    var foldpoints = [];
    p.map(function(value, index, arr)
    {
        if(index % 2) foldpoints.push(value - 1);
    })
    var PLeftMost = getPLeftMost(foldpoints);
    var PRightMost = getPRightMost(foldpoints);
    Lmatrix = LM(foldpoints);
    
    var dplength = sloveByDP(PLeftMost, PRightMost, !isoutput);
    if(isoutput)
    {
        printArr("Sequence", seq, ' ');
        output(strl, str_new, p);
        printArr("PLeftMost", PLeftMost);
        printArr("PRightMost", PRightMost);
        console.log("Minimal fold times " + dplength);
    }
    // console.log("Minimal fold times " + sloveByrecurren(0, strl.length - 1, PLeftMost, PRightMost));

    var table = document.getElementById("outputTable")
    table.children[1].innerHTML = '';
    table.children[0].innerHTML = 'Output';
    var length = 0;
    if(strl.length <= 19)
    {
        length = slove(strl, !isoutput);
    }
    else
    {
        table.children[1].innerHTML = '<h3>Too long to slove!</h3>';
    }
    // console.log("length = " , length);
    if(dplength != length) console.log("not equal with", strl);
}
function Generate(len, isret) 
{
    var gstr = '';
    while(len--)
    {
        var r = Math.random();
        if(r < 0.4)
        {
            gstr += 1;
        }
        else /*if( r < 0.7)*/
        {
            gstr += 2
        }
        // else 
        // {
        //     gstr += 3;
        // }
    }
    if(isret)
    {
        return gstr;
    }
    else
    {
        var textnode = document.getElementById("inputStr");
        textnode.value = gstr;
    }
}

function sloveByDP(pL, pR, noOuput)
{
    var dp = [];
    noOuput = noOuput || false;
    for(var i = 0; i < pL.length; i++)
    {
        let innerArr = [];
        for(var j = 0; j < pL.length; j++)
        {
            innerArr.push(1e32);
        }
        dp.push(innerArr);
    }

    for(var i = pL.length - 1; i >= 0; i--)
    {
        for(var j = i; j < pL.length; j++)
        {
            var len = (j - i) + 1;
            var maxStep = Math.ceil(len / 2);

            if(i == j)
            {
                dp[i][j] = 1;
            }
            else if(i > j)
            {
                dp[i][j] = 1e32;
            }
            else if(j - i == 1)
            {
                dp[i][j] = 2;
            }
            else                                 // both ni, nj valid!
            {
                if(pL[i] <= maxStep && pR[j] <= maxStep)
                {
                    dp[i][j] = 1 + Math.min(dp[pL[i] + i][j], dp[i][j - pR[j]]);
                }
                else if(pL[i] <= maxStep)
                {
                    //see right array
                    var possible = pL[j - maxStep * 2 + 2];
                    if(possible == maxStep)
                    {
                        dp[i][j] = 1 + Math.min(dp[pL[i] + i][j], dp[i][j - possible]);
                    }
                    else
                    {
                        dp[i][j] = 1 + dp[pL[i] + i][j];
                    }
                }
                else if(pR[j] <= maxStep)
                {
                    //see left
                    var possible = pR[i + maxStep * 2 - 2];
                    if(possible == maxStep)
                    {
                        dp[i][j] = 1 + Math.min(dp[i][j - pR[j]], dp[i + possible][j]);
                    }
                    else
                    {
                        dp[i][j] = 1 + dp[i][j - pR[j]];
                    }
                }
                else
                {
                    dp[i][j] = 1e32; // will have any optimal solution but we can get that from the other part of the palindrome.
                }
            }
        }
    }
    if(!noOuput)
    {
        outputpath(dp, pL, pR);
    }
    return dp[0][pL.length - 1];
}

function outputpath(dp, pL, pR)
{
    // var resoult = [];
    var path = [];
    var i = 0;
    var j = pL.length - 1;
    var possible = 0;

    while(i != j && i <= j)
    {
        var len = (j - i) + 1;
        var maxStep = Math.ceil(len / 2);
        var ni = pL[i] + i;
        var nj = j - pR[j];
        if(pL[i] <= maxStep)
        {
            //see right array
            possible = pL[j - maxStep * 2 + 2];
            if(possible == maxStep)
            {
                nj = j - possible;
            }
        }
        else if(pR[j] <= maxStep)
        {
            //see left array
            possible = pR[i + maxStep * 2 - 2];
            if(possible == maxStep)
            {
                ni = i + possible;
            }
        }
        if(j - i == 1)
        {
            ni = i + 1;
            nj = j - 1;
        }

        if(dp[ni][j] < dp[i][j])
        {
            path.push(ni - 1);
            i = ni;
        }
        else
        {
            path.push(nj + 1);
            j = nj;
        }
    }
    path.push(i);
    console.log(path);
}
function sloveByrecurren(i, j, pL, pR)
{
    if(i > j) return 1e32;
    return i == j ? 1 : 1 + Math.min(sloveByrecurren(i + pL[i], j, pL, pR), sloveByrecurren(i, j - pR[j], pL, pR));
}

window.addEventListener('DOMContentLoaded', function () {
    GetPalindrome();
    document.getElementById("inputStr").addEventListener("keypress", function(e)
    {
        if(e.key == 'Enter')
        {
            GetPalindrome();
        }
    })
})


function testBegin(counter, len)
{
    while(counter--)
    {
        GetPalindrome(Generate(len, true));
    }
}

function LM(palin)
{
    ret = [];
    for(var i = 0; i < palin.length; i++)
    {
        let a = [];
        for(var j = 0; j < palin.length; j++)
        {
            a.push(1);
        }
        ret.push(a);
    }
    var palindromeLen = 0;
    var pleft = 0
    for(var i = 0; i < palin.length; i++)
    {
        palindromeLen = palin[i];
        pleft = (palindromeLen - 1) / 2;
        for(var j = i - pleft ; j <= i; j++)
        {
            ret[i][j] = 1 + pleft--;
        }
    }
    return ret;
}