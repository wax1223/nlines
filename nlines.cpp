#include <iostream>
#include <cmath>
#include <vector>
#include <iterator>
#include <cassert>
#include <limits>

using namespace std;

// #define SaveMem

struct FoldStr
{
    FoldStr(const char* _str, short _begin, 
            short _end, short _len, short _center)
    :str(_str), begin(_begin),end(_end),
    len(_len), center(_center){}
    const char* str;
    short begin = 0;
    short end = 0;
    short len = 0;
    short center = 0;
}; 

vector<int> foldseq;
vector<vector<int>> res;

int minimalsize = numeric_limits<int>::max();

bool isFeasibleFold(FoldStr& str, int pos)
{
    int len = str.len;
    int center = str.center;
    int start = 0;
    int end = 0;
    assert(pos >= 0 && pos <= str.end - 1);
    if(pos < center)
    {
        start = str.begin; end = 2 * pos - str.begin;
    }
    else
    {
        end = str.end - 1;
        start = 2 * pos - end;
    }

    while(start != end)
    {
        assert(start <= end);
        if(str.str[start++] != str.str[end--])
        {
            return false;
        }
    }
    return true;
}

FoldStr fold(FoldStr& str, int pos)
{
    int len = str.len;
    int center = str.center;

    if(pos < center)
    {
        short begin = pos + 1;
        short end = str.end;
        short tmplen = end - begin;
        short tmpcenter= floor(tmplen / 2) + begin;
        return FoldStr(str.str, begin, end, tmplen, tmpcenter);
    }
    else
    {
        short begin = str.begin;
        short end = pos;
        short tmplen = end - begin;
        short tmpcenter = floor(tmplen / 2) + begin;
        return FoldStr(str.str, begin, end, tmplen, tmpcenter);
    }
}

void nlines(FoldStr& str) // [begin, end)
{
    int center = str.center;
    int len = str.len;
    if(len <= 0)
    {
        vector<int> tmp;
    #ifdef SaveMem
        int vsize = foldseq.size();
        if(vsize > minimalsize)
        {
            //we will not store size bigger than the optimal value
            return; 
        }
        minimalsize = vsize;
    #endif
        back_insert_iterator<vector<int>> insert_it(tmp);
        copy(foldseq.begin(), foldseq.end(), 
            insert_it);
        res.push_back(move(tmp));
        return;
    }

    for(int i = 0; i < len; ++i)
    {
        int pos = i + str.begin;
        if(isFeasibleFold(str, pos))
        {
            foldseq.push_back(pos);
            auto newstr = fold(str, pos);
            // newstr
            // if(pos < center)
            // {
                nlines(newstr);
            // }
            // else
            // {
            //     nlines(newstr, begin, pos);
            // }
            foldseq.pop_back();
        }
    }
}

int main(int argc, char const *argv[])
{
    if(argc != 2)
    {
        cout << "Please input one string."  << endl;
        return 0;
    }
    const char* inputstr = argv[1];
    short len = strlen(argv[1]);
    cout << "str: " <<  inputstr <<" len: " << len << endl;

    FoldStr str(inputstr, 0, len, len, floor(len / 2));
    nlines(str);
    cout << "Total: " << res.size();
    sort(res.begin(), res.end(), [](vector<int>& v1, vector<int>& v2)
    {
        return v1.size() < v2.size();
    });
    int foldways = count_if(res.begin(), res.end(), [](vector<int>& v)
    {
        return v.size() == minimalsize;
    });
    cout << " Optimal: " << foldways << " only fold " << minimalsize << " times" <<"\n";
    int counter = 1;
    for(auto v : res)
    {
        //only print the minimal solution
        if(v.size() > minimalsize) break;
        if(counter > 50)
        {
            cout << "To much ..." << "\n";
            break;
        }
        cout << "Fold #" << counter << ": ";
        for(auto i : v)
        {
            cout << i << " ";
        }
        cout << "\n";
        counter++;
    }
    return 0;
}

