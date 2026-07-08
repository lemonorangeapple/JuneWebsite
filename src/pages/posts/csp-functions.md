---
title: CSP初赛-常用库函数专题
date: 2023-08-11
tags:
  - 信奥
description: "介绍 CSP 初赛常用的 C/C++ 文件操作与输入输出函数。"
---
1. 文件操作

```cpp
#include <iostream>
#include <cstdio>  // 头文件
using namespace std;
int main() {
    freopen("输入文件", "r", stdin);  // 从文件里读取输入
    freopen("输出文件", "w", stdout);  // 向文件里写入输出

    fclose(stdin);  // 停止读取输入
    fclose(stdout);  // 停止写入输出
    return 0;
}

```

2. 格式化输入输出（可提升输入速度）

```cpp
#include <iostream>
#include <cstdio>  // 头文件
using namespace std;
int main() {
    int n;
    scanf("%d", &n);  // 输入
    printf("%d", n);  // 输出
    return 0;
}

```

| 数据类型 | scanf | printf |
| --- | --- | --- |
| int | %d | %d |
| char | %c | %c |
| float / double | %f | %f |
| long | %ld | %ld |
| long long | %lld | %lld |
| char[] | %s | %s |

3. 保留小数（不四舍五入）

```cpp
#include <iostream>
#include <iomanip>  // 头文件
using namespace std;
int main() {
    double pi = 3.141592653589793;
    cout << fixed << setprecision(2) << pi; // 输出pi到小数点后第2位
    return 0;
}

```

4. 保留小数（四舍五入）

```cpp
#include <iostream>
#include <cstdio>  // 头文件
using namespace std;
int main() {
    double pi = 3.141592653589793;
     printf("%.2f", pi);  // 输出pi到小数点后第2位
    return 0;
}

```

5. 随机数

```cpp
#include <iostream>
#include <cstdlib>  // 头文件
#include <ctime>  // 头文件
using namespace std;
int main() {
    srand(time(0));  // 更新随机数（在程序开头）
    cout << rand() % (100 + 1) + 50;  // 输出一个50~100的随机数（运算顺序不能改变）
    return 0;
}

```

6. 数学函数

```cpp
#include <iostream>
#include <cmath>  // 头文件
using namespace std;
int main() {
    cout << abs(-5);  //求-5的绝对值
    return 0;
}

```

| 函数 | 函数用法 |
| --- | --- |
| 取n绝对值（整数） | abs(n) |
| 取n的绝对值（小数） | fabs(n) |
| n的m次方 | pow(n, m) |
| 开n的平方根 | sqrt(n) |
| 以2为底n的对数 | log2(n) |
| 以10为底n的对数 | log10(n) |
| 勾股定理 | hypot(x, y) |
| 三角函数sin | sin(n) |
| 四舍五入（保留整数） | round(n) |
| 向上取整 | ceil(n) |
| 向下取整 | floor(n) |

7. 反转字符串

```cpp
#include <iostream>
#include <algorithm>  // 头文件
using namespace std;
int main() {
    string str = "abcdefg";
    reverse(str.begin(), str.end());  // 反转字符串
    cout << str;
    return 0;
}

```

8. 排序

```cpp
#include <iostream>
#include <algorithm>  // 头文件
using namespace std;
bool cmp(int x, int y) {
    return x < y; // 从小到大排序
}
int main() {
    int a[10] = {0, 10, 6, 9, 7, 3, 2, 1, 5, 4};
    sort(a, a + 9, cmp); // 排序
    return 0;
}

```

9. 返回x的二进制的个数

```cpp
#include <iostream>
using namespace std;
int f(int x) {
    int ret = 0;
    for (; x; x &= x - 1) ret++;
    return ret;
}
int main() {
    int x = 2;
    cout << f(x);
    return 0;
}

```
