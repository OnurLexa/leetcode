type Fn = (...params: any) => any

function memoize(fn: Fn): Fn {

    const memFn = fn;
    const mapParamId = new Map ();
    const mapParamIdToRes = new Map();
    let runId = 0;
    return function (...params: any) {

        let keyRes = "";
        for (let i = 0; i < params.length; i++) {
            const p = params[i];
            if (mapParamId.has(p)) {
                keyRes += mapParamId.get(p) + ":";
            } else {
                mapParamId.set(p, runId);
                keyRes += runId + ":";
                runId += 1;
            }
        }
        if (mapParamIdToRes.has(keyRes)) {
            return mapParamIdToRes.get(keyRes);
        } else {
            const result = memFn(...params);
            mapParamIdToRes.set(keyRes, result);
            return result;
        }
    }
    
    return function() {
        
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */
