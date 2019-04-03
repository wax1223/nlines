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
        var a = [];
        foldSeq.forEach(x => a.push(x));
        res.push(a);
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
function slove(str) 
{
    foldSeq = []
    res = []
    // nlinesFold(str, 0)
    nlinesFold2(str, 0, str.length);
    res.sort(cmp);
    var seqforReading = [];

    var result = res[0]
    var counter = 1;
    var table = document.getElementById("outputTable")
    table.children[1].innerHTML = '';
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
    table.children[0].textContent = "Output(mimial(" + result.length + ") ways(" + (counter - 1) + "), total(" + res.length + "))";
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

function GetPalindrome() 
{
    var iptstr = document.getElementById('inputStr');
    var inputStr = iptstr.value;
    if(inputStr == '') return;
    var strl = strToArr(inputStr);
    var retArr = Manacher(strl);

    var p = retArr[0];
    var str_new = retArr[1];
    var seq = [];
    strl.map(function(e, i, a) 
    {
        seq.push(i);
    })
    printArr("Sequence", seq, ' ');
    output(strl, str_new, p);

    var foldpoints = [];
    p.map(function(value, index, arr)
    {
        if(index % 2) foldpoints.push(value - 1);
    })
    PLeftMost = getPLeftMost(foldpoints);
    printArr("PLeftMost", PLeftMost);
    var PRightMost = getPRightMost(foldpoints);
    printArr("PRightMost", PRightMost);
    PLeftMost[PLeftMost.length - 1] = 0;
    PRightMost[0] = 0;
    console.log("Minimal fold times " + sloveByDP(PLeftMost, PRightMost));
    // console.log("Minimal fold times " + sloveByrecurren(0, strl.length - 1, PLeftMost, PRightMost));

    slove(strl);
}
function Generate(len) 
{
    var textnode = document.getElementById("inputStr");
    var t = '';
    while(len--)
    {
        t+= (Math.random() > 0.3 ? '1' : '2');
    }
    textnode.value = t;
}

function sloveByDP(pL, pR)
{
    var dp = [];
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
            var ni = pL[i] + i;
            var nj = j - pR[j];
            var padding = 0;
            var len = (j - i) + 1;
            if( len % 2 == 0) padding = 1;
            var center = i + Math.floor((j - i) / 2);
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
            else if(ni > (center + padding) && nj < center) // both ni, nj invalid!
            {
                if((len + 1) == 2)
                {
                    dp[i][j] = 1 + Math.min(dp[ni][j], dp[i][nj]);
                }
                dp[i][j] = 1e32;
            }
            else if(ni <= (center + padding) && nj < center) // ni valid, nj invalid
            {
                dp[i][j] = 1 + dp[ni][j]
            }
            else if(ni > (center + padding) && nj >= center) // nj valid, ni invalid!
            {
                dp[i][j] = 1 + dp[i][nj];
            }
            else                                 // both ni, nj valid!
            {
                dp[i][j] = 1 + Math.min(dp[ni][j], dp[i][nj]);
            }
        }
    }
    return dp[0][pL.length - 1];
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


