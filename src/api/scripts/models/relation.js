export default class Relation {
  constructor(values) {
    this._values = values;
    console.log(this);
  }

  offset(offset) {
    let relation = this.copy();
    relation._offset = offset;
    return relation;
  }

  limit(limit) {
    let relation = this.copy();
    relation._limit = limit;
    return relation;
  }

  values() {
    return this._values
      .filter((value, index) => {
        if (this._offset == null && this._limit == null) {
          return true;
        }

        return this._offset <= index && index < this._offset + this._limit;
      });
  }

  copy() {
    let relation = new Relation(this._values);
    relation._offset = this._offset;
    relation._limit = this._limit;
    return relation;
  }
}
