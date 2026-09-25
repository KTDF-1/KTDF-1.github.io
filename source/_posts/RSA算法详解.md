---
title: RSA算法详解      # 文章标题
math: true
author: K头的扉     			     # 作者
date: 2025-12-28 17:53:00                    # 发布时间
index_img: /img/RSA.png		     # 文章封面
tags: [密码学, 数字安全, RSA算法, 非对称加密, 信息安全技术]        # 标签
categories: 技术科普                          # 分类
toc: true                                    # 是否显示目录
comments: true                               # 是否开启评论
---

# RSA算法详解

参考资料

[RSA 算法详解 · Harlan's Cyberspace](https://harlanhu.com/posts/explore/algorithm/rsa-algorithm/) 

[RSA加密算法解析_rsa-d加密算法-CSDN博客](https://blog.csdn.net/paycho/article/details/131050459?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-131050459-blog-130738368.235^v43^pc_blog_bottom_relevance_base9&spm=1001.2101.3001.4242.1&utm_relevant_index=2) 

## RSA 算法简介
RSA 算法是一种非对称加密算法，由 Ron Rivest、Adi Shamir 和 Leonard Adleman 于 1977 年提出。它是现代密码学的基石之一，广泛应用于数据加密、数字签名、密钥交换等领域。 RSA 算法的核心思想是基于大整数的质因数分解难题。它利用一对密钥（公钥和私钥）进行加密和解密操作，公钥用于加密数据，私钥用于解密数据。由于 RSA 算法的安全性和通用性，它成为了许多安全协议（如 SSL/TLS、SSH、PGP 等）的基础。

---

## RSA 算法的历史背景
RSA 算法的发明标志着公钥密码学的诞生。在 RSA 算法之前，密码学主要依赖于对称加密算法，即加密和解密使用相同的密钥。对称加密算法的缺点是密钥分发困难，通信双方需要安全地共享密钥。 1976 年，Whitfield Diffie 和 Martin Hellman 提出了公钥密码学的概念，但未给出具体实现。1977 年，Rivest、Shamir 和 Adleman 提出了 RSA 算法，首次实现了公钥加密和数字签名。RSA 算法的发明对密码学领域产生了深远的影响，推动了现代信息安全技术的发展。

---

## RSA 算法的数学基础
RSA 算法的安全性依赖于数论中的一些重要概念和定理，主要包括：

### 质数与互质
+ **质数**：大于 1 的自然数，除了 1 和它本身外，不能被其他自然数整除。
+ **互质**：两个整数的最大公约数为 1，或者说没有初1以外的公因数，称为互质。

### 欧拉函数
欧拉函数 ϕ(n) 表示小于或等于 n 的正整数中与 n 互质的数的个数。
对于质数 p，有这样的性质：$ \\phi(p)=p−1 $
对于两个不同的质数 p 和 q，有：$ \\phi(p×q) = (p−1) × (q−1) $

### 模运算
模运算是指求一个数除以另一个数的余数，就是简单的求余数。RSA 算法中大量使用了模运算的性质，例如：

$ ( a × b ) \\mod n = [( a\\mod n ) × (b \\mod n)] \\mod n $

$ a^b \\mod n $ 可以通过快速幂算法高效计算，快速幂算法可将指数运算的时间复杂度从O(b)降至O(logb)，避免大指数计算的效率问题。

之后你可能会遇到以下的表达式，这里做一下说明：

$ a ≡ 1 (\\mod n) $ 表示整数 a 和 1 在模 n 的情况下等价，≡ 是同余符号

$ a ≡ 1 \\mod n $ 这是数学同余的简写形式，与 $ a ≡ 1 \\pmod{n} $ 的含义完全一致

### 模逆元
如果两个正整数a和n互质，那么一定可以找到整数b，使得 ab-1被n整除，或者说ab被n除的余数是1。这时，b就叫做a的“**模逆元**”（也叫乘法逆元，模反元素）。

$ a·b≡1(\\mod n) $

例： a=3,n=4

(3b-1)%4=0 ；3b= 4k +1 ；(k≥1为任意整数)

得到一个特解 $b=3$，其余解 $b=7,11,-1,\dots$

> 模逆元不是唯一的：若 $b_0$ 是一组特解，则全部通解为：
> $$b = b_0 + k\cdot n,\quad k\in\mathbb Z$$

当 $a$ 与 $n$ 互质时，根据欧拉定理：
$$a^{\varphi(n)} \equiv 1 \pmod{n}$$
变形得到 $a$ 在模 $n$ 下的模逆元：
$$b = a^{\varphi(n)-1}$$

> 补充：若模数 $n$ 为质数，$\varphi(n)=n-1$，退化为费马小定理，逆元为 $a^{n-2}$。
> 逆元存在前提：$\boldsymbol{\gcd(a,n)=1}$，a与模数n互质；不互质则不存在乘法逆元。

### 欧拉定理
欧拉定理指出，如果两个正整数 a 和 n 互质，则：

$ a ^{\\phi(n)} ≡ 1 \\mod n $

 欧拉定理是 RSA 算法的核心数学基础。

### <font style="color:rgb(31, 35, 41);">费马小定理 </font>
<font style="color:rgb(31, 35, 41);">费马小定理是欧拉定理的</font>**<font style="color:rgb(31, 35, 41);">特殊情况</font>**<font style="color:rgb(31, 35, 41);">，适用条件更具体：</font>

<font style="color:rgb(31, 35, 41);"> 若a是正整数，p 是质数，且a 与p 互质（即a 不是 p 的倍数），则：</font>

$  a^{p-1} \\equiv 1 \\pmod{p}  $

**<font style="color:rgb(31, 35, 41);">例</font>**<font style="color:rgb(31, 35, 41);">：取a=2 , p=5 （5是质数，且2与5互质） </font>

<font style="color:rgb(31, 35, 41);">计算：</font>$ ( 2^{5-1}=2^4=16 ) $<font style="color:rgb(31, 35, 41);">，</font>$ ( 16 \\div 5 ) $<font style="color:rgb(31, 35, 41);">的余数是1，即</font>$ ( 2^4 \\equiv 1 \\pmod{5} ) $<font style="color:rgb(31, 35, 41);">，符合公式。 </font>

**<font style="color:rgb(31, 35, 41);">补充说明</font>**<font style="color:rgb(31, 35, 41);">：</font>

<font style="color:rgb(31, 35, 41);"> 欧拉定理中， n 是任意与 a 互质的正整数；而当 n 是质数 p 时，欧拉函数 φ(p)=p-1 ，因此费马小定理是欧拉定理在“ n 为质数”时的简化形式。</font>

<font style="color:rgb(31, 35, 41);"></font>

### <font style="color:rgb(31, 35, 41);">中国剩余定理：</font>
若两个数 m 和 n 互质，则对于任意整数 a、b，存在唯一的整数 x（在模 mn 的范围内），使得

$ x≡a(\\mod m) $ 且 $ x≡b(\\mod n) $

### <font style="color:rgb(31, 35, 41);">欧几里得算法（辗转相除法）</font>
<font style="color:rgb(31, 35, 41);">欧几里得算法是求</font>**<font style="color:rgb(31, 35, 41);">两个正整数最大公约数（记为gcd）</font>**<font style="color:rgb(31, 35, 41);">的高效方法，这是RSA选择公钥的关键工具之一。</font>

**<font style="color:rgb(31, 35, 41);">核心原理 </font>**

<font style="color:rgb(31, 35, 41);">对于两个正整数 a、b （要求 a > b ），它们的最大公约数，等于“较小数 b ”和“ a 除以 b 的余数”的最大公约数，即：</font>$ gcd(a, b) = gcd(b, a \\mod b) $<font style="color:rgb(31, 35, 41);">重复这个“用余数替换大数”的过程，直到余数为0，此时的</font>**<font style="color:rgb(31, 35, 41);">除数</font>**<font style="color:rgb(31, 35, 41);">就是原来两个数的最大公约数。</font>

**<font style="color:rgb(31, 35, 41);">算法步骤</font>**<font style="color:rgb(31, 35, 41);">（以</font>$ ( \\gcd(24, 18) ) $<font style="color:rgb(31, 35, 41);">为例）</font>

<font style="color:rgb(31, 35, 41);"> 1. 计算</font>$ ( 24 \\mod 18 = 6 ) $<font style="color:rgb(31, 35, 41);">，问题简化为求</font>$ ( \\gcd(18, 6) ) $<font style="color:rgb(31, 35, 41);">； </font>

<font style="color:rgb(31, 35, 41);">2. 计算</font>$ ( 18 \\mod 6 = 0 ) $<font style="color:rgb(31, 35, 41);">，余数为0，停止运算； </font>

<font style="color:rgb(31, 35, 41);">3. 此时的除数是6，因此</font>$ ( \\gcd(24, 18) = 6 ) $<font style="color:rgb(31, 35, 41);">。</font>

**<font style="color:rgb(31, 35, 41);">RSA中的作用</font>**<font style="color:rgb(31, 35, 41);"> </font>

<font style="color:rgb(31, 35, 41);">在RSA选择公钥 e 时，要求 e 与 φ(n) 互质（即</font>$ ( \\gcd(e, φ(n)) = 1 ) $<font style="color:rgb(31, 35, 41);">）。我们可以通过欧几里得算法，快速计算 e 和 φ(n) 的最大公约数，以此判断 e 是否符合公钥的要求。</font>

### 扩展欧几里得算法
在 a 与模数 m 互质的前提下，求解 a 在模 m 下的乘法逆元
方程形式：$ \(ax \equiv 1 \pmod{m}\)$ 其中x就是a在模m下的乘法逆元
等价转化为不定方程：$\(\boldsymbol{ax + my = 1}\)$
前提条件：$\(\gcd(a,m)=1\)$，**只有 a 和模数 m 互质，逆元才存在**。

---

## RSA 算法的实现步骤
RSA 算法的实现可以分为以下几个步骤：

### 1. 密钥生成
1. 选择两个大质数 p 和 q。
2. 计算 n=p×q。
3. 计算欧拉函数 $ ϕ(n)=(p−1)×(q−1) $。
4. 选择一个整数 e，满足 1<e<ϕ(n) 且 e 与 ϕ(n) 互质。e 通常选择 65537，因为它是一个质数且二进制表示中只有两个 1，便于快速计算。
5. 计算 d，使得 $ d×e≡1\\modϕ(n) $。d 是 e 的模逆元，可以通过扩展欧几里得算法计算。
6. 公钥为 (e,n)，私钥为 (d,n)，私钥用于解密和数字签名，需严格保密。

### 2. 加密过程
对于明文 M，计算密文 ：

$ C=M^{e}\\mod n $

补充：明文 M 需满足0≤M<n，若 M≥n，需先分块处理

### 3. 解密过程
对于密文 C，计算明文 M：

$ M=C^{d}\\mod n $

## RSA算法逻辑
因为我们并不是数学专业的学生，学习时没必要对使用到的定理/函数等太过于深究，但关于RSA算法逻辑部分还是需要进行了解的。

为了便于对RSA算法的接受，下面会从数学角度进行说明，采用数学角度讲解，也是有助于对其的理解以及今后的学习和使用，当然这里也不会在这方面太过详细地说明。

RSA算法之所以可以被用来进行非对称加密，主要原因是存在加密：$ C=M^{e}\\mod n $ 和解密：$ M=C^{d}\\mod n $ ，将两个公式合并之后得到$ M^{e⋅d}≡M(\\mod n) $，也就是说$ M^{e⋅d}≡M(\\mod n) $的成立，是RSA算法的核心，接下来我们来推导一下：

当M与n互质时，已知：

$ a^{ϕ(n)} ≡1( \\mod n ) $      以及      $ e⋅d≡1(\\modϕ(n)) $   

那么：

$ M^{ed}=M^{k⋅ϕ(n)+1}=(M^{ϕ(n)})^{k}⋅M≡1^k⋅M≡M(\\mod n) $ 

及：

$ M^{e⋅d}≡M(\\mod n) $

当M与n不互质时：

先说明：

RSA 里的n是两个大质数的乘积（n=p×q），所以 M 和 n 不互质的话，M 肯定是p的倍数，或者是q

的倍数（因为 M 是明文，通常M<n，不会同时是 p 和 q 的倍数，否则M≥pq=n啦）。

假设 M 是p的倍数，即M=kp（k是整数，且k<q）：

1. 因为q是质数，M=kp和q互质（q不整除kp），根据费马小定理，

$ M ^{q−1 }≡1(\\mod q) $。

2. 而$ φ(n)=(p−1)(q−1) $，所以$ M ^{φ(n)} =[M^{ q−1} ] ^{p−1 }≡1 ^{p−1 }=1(\\mod q) $，即

$ M ^{φ(n)} =1+tq $（t是整数）。

3. 已知$ e⋅d≡1(\\modφ(n)) $，所以$ ed=1+sφ(n) $（s是整数），代入得：

$ M ^{ed} =M ^{1+sφ(n)} =M×(M ^{φ(n)} ) ^s =M×(1+tq) ^s $

4.  展开$ (1+tq) ^s $ 后得$ 1+C(s,1)tq+...+(tq) ^s $，除了第一项 “1”，其他项都包含q，因此：

$ M ^{ed} =M+M×t ' q $（t ′ 是整数）

5. 又因为M=kp，所以$ M×t' q=kp×t 'q=t ' k×n $，这一项模n等于 0，最终：

$ M^{ed} ≡M(\\mod n) $

这便是RSA的核心等式的由来。



令 $ C = M^e $ ，则 $ C^d ≡ M (\\mod n) $   且C满足： $ C ≡ M^e(\\mod n) $

整理后：
$ C = M^e (\\mod n) $
$ M = C^d (\\mod n) $

这就是RSA的数学逻辑原理，怎么样，这么一看是不是对RSA算法有了更清晰的认识。

## RSA算法优化技术
由于 RSA 算法的计算量较大，实际应用中通常采用优化后的算法：

### CRT加速
CRT（中国剩余定理）通过分解模数提升 RSA 解密效率。具体来说，RSA 私钥通常包含以下参数：

+ 模数$ (n = p \\times q) $（p 和 q 为大素数）
+ 私钥指数 d
+ CRT 优化参数：
    - $ (d_p = d \\mod (p-1)) $
    - $ (d_q = d \\mod (q-1)) $
    - $ (q^{-1} \\mod p)（q 在模 p 下的逆元） $

解密时，CRT 将原本的大数运算 $ (C^d \mod n) $分解为：

1. 计算 $ (m_p = c^{d_p} \\mod p) $
2. 计算$ (m_q = c^{d_q} \\mod q) $
3. 通过 CRT 合并结果：$ (m = m_q + q \\times \\left( (m_p - m_q) \\times q^{-1} \\mod p \\right)) $

#### CRT原理
##### 为什么能拆解？（核心依据：中国剩余定理+费马小定理）
RSA中( n = p×q )（( p、q )是互质的大质数），根据中国剩余定理：  
“若两个数互质，则任意整数对这两个数的模结果，能唯一确定它对这两个数乘积的模结果”。

所以解密时的$ ( C^d \mod n ) $，可以拆成先算$ ( C^d \mod p ) $和$ ( C^d \mod q ) $，再合并这两个结果——这是拆解的前提。



##### 分解公式的推导
已知私钥指数( d )满足$ ( e·d ≡ 1 \\pmod{φ(n)} ) $，且$ ( φ(n) = (p-1)(q-1) ) $，我们定义：

$ ( d_p = d \\mod (p-1) )、( d_q = d \\mod (q-1)  $

**步骤1**：推导$ ( m_p = C^{d_p} \\pmod{p} ) $

因为$ ( d = k·(p-1) + d_p ) $（( k )是整数），所以：

$ C^d = C^{k·(p-1) + d_p} = \\left[C^{p-1}\\right]^k · C^{d_p}  $

又因为 p 是质数，若 C 与 p 互质，根据费马小定理，$ ( C^{p-1} ≡ 1 \\pmod{p} ) $，因此：

$  C^d ≡ 1^k · C^{d_p} ≡ C^{d_p} \\pmod{p}  $    即       $ ( m_p = C^{d_p} \\pmod{p} ) $

（若( C )是( p )的倍数，$ ( C ≡ 0 \\pmod{p} ) $，则$ ( C^d ≡ 0 ≡ C^{d_p} \\pmod{p} ) $，结论同样成立）。



**步骤2**：同理推导$ ( m_q = C^{d_q} \\pmod{q} ) $

和步骤1完全一致：因为$ ( d = t·(q-1) + d_q ) $，结合费马小定理，可得：

$  C^d ≡ C^{d_q} \\pmod{q}  $     即     $ ( m_q = C^{d_q} \\pmod{q} ) $。



**步骤3**：推导合并公式

根据中国剩余定理，要找( m )满足：

$ ( m ≡ m_p \\pmod{p} ) $

$ ( m ≡ m_q \\pmod{q} ) $

设$ ( m = m_q + q·t ) $（ t 是整数），代入第一个条件：

$  m_q + q·t ≡ m_p \\pmod{p}  $

整理得：

$  q·t ≡ (m_p - m_q) \\pmod{p}  $

因为 q 与 p 互质， q 存在模 p 的逆元$ ( q^{-1} \\pmod{p} ) $，两边同乘逆元得：

$  t ≡ (m_p - m_q) · q^{-1} \\pmod{p}  $

将 t 代回 m 的表达式，就得到合并公式：

$  m = m_q + q × \\left( (m_p - m_q) × q^{-1} \\pmod{p} \\right)  $

## RSA 算法的安全性分析
RSA 算法的安全性基于以下两个假设：

**质因数分解难题：**

对于一个大的合数 n=p×q，分解 n 为 p 和 q 是非常困难的。

**离散对数难题：**

在已知 e 和 n 的情况下，计算 d 是非常困难的。

1. 密钥长度

RSA 算法的安全性依赖于密钥长度。常见的密钥长度有 1024 位、2048 位和 4096 位。<font style="color:rgba(0, 0, 0, 0.85);">随着经典计算能力的提升，1024 位密钥的安全性已不足；而量子计算机（如通过 Shor 算法）在理论上可高效分解大整数，进一步威胁 RSA 安全性。目前（2025 年），2048 位及更长的 RSA 密钥，无论经典计算机还是已实现的量子计算机都无法破解</font>，平时使用时，推荐使用 2048 位或更长的密钥。

2. 攻击方法

暴力破解：尝试所有可能的私钥，计算量极大，不可行。

数学攻击：通过数学方法分解 n，例如使用数域筛法（NFS）或通用数域筛法（GNFS）。

侧信道攻击：通过分析加密设备的功耗、电磁辐射等信息，推测私钥。

