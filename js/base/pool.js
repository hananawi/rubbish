



export default class Pool{
  constructor(){
    this.pool = {};
  }

  getpool(name){
    return this.pool[name] || (this.pool[name] = []);
  }

  getins(name){
    var tmp = this.getpool(name);
    return (tmp.length ? tmp.shift() : new name());
  }

  recover(name, ins){
    this.getpool(name).push(ins);
  }
}