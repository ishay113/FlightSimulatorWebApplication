/*
 * timeseries.h
 *
 *  Created on: 26 ����� 2020
 *      Author: Eli
 */

#ifndef TIMESERIES_H_
#define TIMESERIES_H_
#include <iostream>
#include <string.h>
#include <fstream>
#include<map>
#include <vector>
#include <string.h>
//#include <bits/stdc++.h>
#include <algorithm>

//#include <algorithm>
#include <bitset>
#include <complex>
#include <deque>
#include <exception>
#include <fstream>
#include <functional>
#include <iomanip>
#include <ios>
#include <iosfwd>
#include <iostream>
#include <istream>
#include <iterator>
#include <limits>
#include <list>
#include <locale>
#include <map>
#include <memory>
#include <new>
#include <numeric>
#include <ostream>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <stdexcept>
#include <streambuf>
#include <string>
#include <typeinfo>
#include <utility>
#include <valarray>
#include <vector>
#include <ccomplex>
#include <cfenv>
#include <cinttypes>
//#include <cstdalign>
#include <cstdbool>
#include <cstdint>
#include <ctgmath>
#include <cwchar>
#include <cwctype>
#include <cctype>
#include <cerrno>
#include <cfloat>
#include <ciso646>
#include <climits>
#include <clocale>
#include <cmath>
#include <csetjmp>
#include <csignal>
#include <cstdarg>
#include <cstddef>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <array>
#include <atomic>
#include <chrono>
#include <condition_variable>
#include <forward_list>
#include <future>
#include <initializer_list>
#include <mutex>
#include <random>
#include <ratio>
#include <regex>
#include <scoped_allocator>
#include <system_error>
#include <thread>
#include <tuple>
#include <typeindex>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>

using namespace std;

class TimeSeries{


	map<string,vector<float>> ts;
	size_t dataRowSize;
public:

	vector<string> atts;

	TimeSeries(const char* CSVfileName){
		ifstream in(CSVfileName);
		string head;
		in>>head;
		string att;
		stringstream hss(head);
		while(getline(hss,att,',')){
			ts.emplace(att,vector<float>());
		    atts.push_back(att);
		}

		while(!in.eof()){
			string line;
			in>>line;
			string val;
			stringstream lss(line);
			int i=0;
			while(getline(lss,val,',')){
				ts[atts[i]].push_back(stof(val));
			     i++;
			}
		}
		in.close();

		dataRowSize = ts[atts[0]].size();

	}

	const vector<float>& getAttributeData(string name)const{
		return ts.at(name);
	}

	const vector<string>& gettAttributes()const{
		return atts;
	}

	size_t getRowSize()const{
		return dataRowSize;
	}

	~TimeSeries(){
	}
};



#endif /* TIMESERIES_H_ */
