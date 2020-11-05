export class CustomFieldsHelper {
  private static simpleComparators = {
    eq: (a, b) => {
      return a === b
    },
    gt: (a, b) => {
      return a > b
    },
    gte: (a, b) => {
      return a >= b
    },
    lt: (a, b) => {
      return a < b
    },
    lte: (a, b) => {
      return a <= b
    },
    ne: (a, b) => {
      return a !== b
    },
    in: (docVal, operand) => {
      if (Array.isArray(docVal)) {
        return docVal.some((val) => {
          return operand.indexOf(val) !== -1;
        });
      } else {
        return operand.indexOf(docVal) !== -1
      }
    },
    nin: (docVal, operand) => {
      if (Array.isArray(docVal)) {
        return docVal.every((val) => {
          return operand.indexOf(val) === -1;
        });
      } else {
        return operand.indexOf(docVal) === -1
      }
    },
    all: (docVal, operand) => {
      return docVal instanceof Array && docVal.reduce((last, cur) => {
        return last && operand.indexOf(cur) !== -1
      }, true)
    }
  };

  static evaluateFieldRule(field, fieldRule, obj) {
    if (!obj.hasOwnProperty(field)) {
      // object does not have the property mentioned in rule
      return false
    }
    if (fieldRule === null) {
      // typeof null is object, that's why this is not inside switch
      return (obj[field] === null)
    }
    switch (typeof fieldRule) {
      case 'boolean':
      case 'number':
      case 'string':
        return (obj[field] === fieldRule);
      case 'object':
        // Get the operator. We only support rules like: {'in': []}, {'eq': 'value'}
        // meaning {'operator': <operand>}. Multiple operators are supported
        return Object.keys(fieldRule).every((op) => {
          if (op in CustomFieldsHelper.simpleComparators) {
            // FIXME(tomo): Avoid 1 >= null or null <= 0...
            // right now this is possible with simpleComparators
            if (Array.isArray(obj[field])) {
              // FIXME(tomo): Add support for multi select values
              return false
            } else {
              // FIXME(tomo): we assume the object field value is numeric, string or boolean
              // check if an ngModel can produce something other than this and multi select
              // treated above
              return CustomFieldsHelper.simpleComparators[op](obj[field], fieldRule[op])
            }
          } else {
            return false;
          }
        })
    }
  }

  public static checkRule(rule, object) {
      // A rule must always evaluate to true or false
      // Ex rule: {'country': {'in': ['US', 'DE']}}
      // Ex rule2: {'country': 'RO'}
      // Ex rule3: {'country': {'eq': 'RO'},
      //            'state': {'in': ['Cluj', ...]}}
      // A logical AND is applied if multiple fields are present
      if (rule === null || rule === undefined) {
        return false;
      }
      switch (typeof rule) {
        case 'boolean':
          return rule;
        case 'object':
          if (object === undefined) {
            return false;
          }
          return Object.keys(rule).every(
            function checkEveryFieldRule(field) {
              return CustomFieldsHelper.evaluateFieldRule(field, rule[field], object)
            });
        default:
          return false
      }
    }

}
