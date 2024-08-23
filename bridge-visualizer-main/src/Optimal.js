export const Optimal = (river, hd) => {
    const n = river.length;
    const dp = new Array(n);
    dp[0] = 0;
    const animations = new Array();
    const bridge = new Array(n);
    bridge[0] = [0];
    for(let i = 1; i<n; i++)
    {
        let curr = river[i];
        let j;
        if(i-hd < 0)
            j = 0;
        else
        j = i-hd;
    
        let ans = j;
        dp[i] = dp[j] + curr;
        animations.push([i,j,bridge[j],dp[j]+curr,dp[j],[ans,dp[i]]]);
        j++;
        
        while(j<i) {
            if(dp[i] > dp[j]+curr) {
                dp[i] = dp[j] + curr;
                ans = j;
            }
            animations.push([i,j,bridge[j],dp[j]+curr,[ans,dp[i]]]);
            j++;
        }
        
        bridge[i] = [...bridge[ans]];
        bridge[i].push(i);
        animations.push([bridge[i],i, dp[i]]);
    }
    return animations;
}

// i -> red
// j -> orange
// brige[j] -> yellow

// jth index -> red, dp[j] + curr
// ans index -> green, dp[ans]