class Rules {
    constructor() {
        this.ruleMap = new Map()
        this.ruleMap.set('SYMBAROUM', 'Symbaroum')
        this.ruleMap.set('COC', 'Call of Cthulhu')
        this.ruleMap.set('DSA', 'Das Schwarze Auge')
    }

    getRuleTranslation(key){
        return this.ruleMap.get(key)
    }
}

export default Rules