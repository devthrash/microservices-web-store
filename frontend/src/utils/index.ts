export function omit(object: { [key: string]: any }, props: string[]) {
    return Object.keys(object).reduce((newObject, prop) => {
        if (!props.includes(prop)) {
            newObject[prop] = object[prop]
        }

        return newObject
    }, {} as { [key: string]: any })
}
