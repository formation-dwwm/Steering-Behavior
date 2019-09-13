/**
 *
 */
export class Result
{
    /**
     *
     * @param go
     */
    constructor(go)
    {
        this.go = go;
    }

    /**
     *
     * @param v
     * @returns {Result}
     */
    static Ok(v)
    {
        return new this((onSuccess, _) => onSuccess(v));
    }

    /**
     *
     * @param r
     * @returns {Result}
     */
    static Err(r)
    {
        return new this((_, onFailure) => onFailure(r));
    }

    /**
     *
     * @param f
     * @returns {*}
     */
    map(f)
    {
        return this.go(v => Result.Ok(f(v)), r => Result.Err(r));
    }

    /**
     *
     * @param f
     * @returns {*}
     */
    chain(f)
    {
        return this.go(v => f(v), r => Result.Err(r));
    }

    /**
     *
     * @returns {*}
     */
    unwrap()
    {
        return this.go(v => v, r => { throw r; });
    }
}

/**
 *
 * @param attempt
 * @returns {Result}
 */
export function Try(attempt)
{
    try
    {
        let res = attempt();
        return Result.Ok(res);
    }
    catch(e)
    {
        return Result.Err(e);
    }
}
