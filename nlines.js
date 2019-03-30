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
var foldSeq = []
var res = []
var last_fold = 0;
function slove(str) 
{
    foldSeq = []
    res = []
    nlinesFold(str, 0)
    res.sort(cmp);
    var seqforReading = [];

    var result = res[0]
    var left = 0; 
    var right = result.length - 1;
    for (var i = 0; i < result.length; i++)
    {
        var foldat = result[i];
        if(Math.floor(foldat / 2) > (right - left) / 2)
        {
            //no need to update
            seqforReading.push(foldat);
            right = foldat - 1;
        }
        else
        {
            //need to update
            seqforReading.push(foldat + left);
            left = foldat + 1;
        }
    }
    console.log();
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

function printArr(id , arr, tdclass)
{
    tdclass = tdclass || "text";
    var tr = document.getElementById(id);
    var tableBody = document.getElementById('table').children[0];
    if(!tr)
    {
        tr = document.createElement("tr");
        tr.setAttribute("id", id);
        tableBody.append(tr);
    }   
    tr.innerHTML = '<td>' + id + '</td>' + arr.map(function(elmt, i, arr)
    {
        return '<td class=' + tdclass + '>' + elmt + '</td>'
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
    pstr.innerHTML = str.join(" ");

    pseq.innerHTML = '<td> </td>' + str_new.map(function(elmt, i, arr)
    {
        return '<td>' + i + '</td>'
    }).join(" ");

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
    parr.innerHTML = "<td>Palindrome array</td>" + p.map(x => '<td class="text">' + x + '</td>').join(" ");
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
    output(str, str_new.slice(1), p.slice(1));
    return p;
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

}
var PLeftMost;

function GetPalindrome() 
{
    var iptstr = document.getElementById('inputStr');
    var inputStr = iptstr.value;
    if(inputStr == '') return;
    var strl = strToArr(inputStr);
    var retArr = Manacher(strl);
    var foldpoints = [];
    retArr.map(function(value, index, arr)
    {
        if(index % 2 == 0 && index != 0) foldpoints.push(value - 1);
    })
    PLeftMost = getPLeftMost(foldpoints);
    var PRightMost = getPRightMost(foldpoints);

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


