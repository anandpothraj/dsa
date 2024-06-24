var strStr = function(string, pattern) {

    function verifyPattern(txt, pat, index) {
        for(let i = 0; i < pat.length; i++) {
            if(pat[i] !== txt[index]) return false;
            index++;
        }
        return true;
    }
    
    function generateHash(str, patLength, base, prime) {
        let hash = 0;
        for(let i = 0; i < patLength; i++) {
            hash = (hash * base + str.charCodeAt(i)) % prime;
        }
        return hash;
    }
    
    let base = 26;
    let prime = 1000000007;
    let patLength = pattern.length;
    let strLength = string.length;

    if (patLength === 0) return 0;
    if (patLength > strLength) return -1;
    
    let patHash = generateHash(pattern, patLength, base, prime);
    let currHash = generateHash(string, patLength, base, prime);
    
    if (patHash === currHash && verifyPattern(string, pattern, 0)) return 0;
    
    let basePower = 1;
    for(let i = 1; i < patLength; i++) {
        basePower = (basePower * base) % prime;
    }
    
    for(let i = patLength; i < strLength; i++) {
        currHash = (currHash - string.charCodeAt(i - patLength) * basePower % prime + prime) % prime;
        currHash = (currHash * base + string.charCodeAt(i)) % prime;
        
        if (patHash === currHash && verifyPattern(string, pattern, i - patLength + 1)) return i - patLength + 1;
    }
    
    return -1;
};


console.log(strStr("hello", "ll"));      // 2
console.log(strStr("aaaaa", "bba"));     // -1
console.log(strStr("", ""));             // 0
console.log(strStr("abc", "c"));         // 2