---
title: CSP初赛-基础数论专题
date: 2023-09-03
tags:
  - 信奥
description: "介绍 CSP 初赛常见的数论基础，如素数判断和埃氏筛。"
---
## 素数筛法

1. 素数判断

```cpp
#include <iostream>
using namespace std;
bool isPrime(int x) {
    if (x <= 1) {
        return false;
    }
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
}
int main() {
    int n;
    cin >> n;
    bool prime = isPrime(n);
    if (prime == true) {
        cout << "Yes";
    }
    else {
        cout << "No";
    }
    return 0;
}

```

2. 埃氏筛法

```cpp
#include <iostream>
using namespace std;

int main() {
    int isPrime[100000];
    int n;
    cin >> n;
    for (int i = 0; i <= n; i++) {
        isPrime[i] = 1;
    }
    for (int i = 2; i <= n; i++) {
        if (isPrime[i] == 1) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    for (int i = 2; i <= n; i++) {
        if (isPrime[i] == 1) {
            cout << i << ' ';
        }
    }
    return 0;
}

```

3. 欧拉筛法

```cpp
#include <iostream>
using namespace std;
int isPrime[100000], a[100000], count = 0;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i <= n; i++) {
        isPrime[i] = 1;
    }
    for (int i = 2; i <= n; i++) {
        if (isPrime[i] == 1) {
            a[count] = i;
            count++;
        }
        for (int j = 0; j < count && i * a[j] <= n; j++) {
            isPrime[i * a[j]] = 0;
            if (i % a[j] == 0) {
                break;
            }
        }
    }
    for (int i = 2; i <= n; i++) {
        if (isPrime[i] == 1) {
            cout << i << ' ';
        }
    }
    return 0;
}

```

## 质因子分解

4. 质因子分解

```cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            cout << i << ' ';
            n /= i;
        }
    }
    if (n > 1) {
        cout << n;
    }
    return 0;
}

```

5. 求因子个数

```cpp
#include <iostram>
using namespace std;

int main() {
    int n;
    cin >> n;
    int res = 1;
    for (int i = 2; i * i <= n; i++) {
        int cnt = 0;
        while (n % i == 0) {
            cnt++;
            n /= i;
        }
        res *= (cnt + 1);
    }
    if (n > 1) {
        res *= 2;
    }
    cout << res;
    return 0;
}

```

## 最大公因数及最小公倍数

6. 辗转相除法

```cpp
#include <iostram>
using namespace std;
int gcd(int x, int y) {
    if (y == 0) {
        return x;
    }
    return gcd(y, x % y);
}
int lcm(int x, int y) {
    return x / gcd(x, y) * y;
}
int main() {
    int a, b;
    cin >> a >> b;
    cout << gcd(a, b) << endl;
    cout << lcm(a, b) << endl;
    return 0;
}

```

7. 更相减损法

```cpp
#include <iostram>
using namespace std;
int gcd(int x, int y) {
    int k = 1;
    while (x && y) {
        if (x % 2 == 1 || y % 2 == 1) {
            if (x > y) {
                swap(x, y);
            }
            y -= x;
        }
        else if (x % 2 == 0 && y % 2 == 0) {
            k *= 2;
            x /= 2;
            y /= 2;
        }
    }
    return max(x, y) * k;
}
int lcm(int x, int y) {
    return x / gcd(x, y) * y;
}
int main() {
    int a, b;
    cin >> a >> b;
    cout << gcd(a, b) << endl;
    cout << lcm(a, b) << endl;
    return 0;
}

```
