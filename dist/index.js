(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["@cloudbase/vue-provider"] = factory();
	else
		root["@cloudbase/vue-provider"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@cloudbase/database/dist/esm/aggregate.js":
/*!****************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/aggregate.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Aggregation; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/@cloudbase/database/dist/esm/index.js");
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bson */ "./node_modules/bson/dist/bson.browser.esm.js");
/* harmony import */ var _serializer_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serializer/query */ "./node_modules/@cloudbase/database/dist/esm/serializer/query.js");



class Aggregation {
    constructor(db, collectionName) {
        this._stages = [];
        if (db && collectionName) {
            this._db = db;
            this._request = new _index__WEBPACK_IMPORTED_MODULE_0__["Db"].reqClass(this._db.config);
            this._collectionName = collectionName;
        }
    }
    async end() {
        if (!this._collectionName || !this._db) {
            throw new Error('Aggregation pipeline cannot send request');
        }
        const result = await this._request.send('database.aggregate', {
            collectionName: this._collectionName,
            stages: this._stages
        });
        if (result && result.data && result.data.list) {
            return {
                requestId: result.requestId,
                data: JSON.parse(result.data.list).map(bson__WEBPACK_IMPORTED_MODULE_1__["EJSON"].parse)
            };
        }
        return result;
    }
    unwrap() {
        return this._stages;
    }
    done() {
        return this._stages.map(({ stageKey, stageValue }) => {
            return {
                [stageKey]: JSON.parse(stageValue)
            };
        });
    }
    _pipe(stage, param) {
        this._stages.push({
            stageKey: `$${stage}`,
            stageValue: JSON.stringify(param)
        });
        return this;
    }
    addFields(param) {
        return this._pipe('addFields', param);
    }
    bucket(param) {
        return this._pipe('bucket', param);
    }
    bucketAuto(param) {
        return this._pipe('bucketAuto', param);
    }
    count(param) {
        return this._pipe('count', param);
    }
    geoNear(param) {
        return this._pipe('geoNear', param);
    }
    group(param) {
        return this._pipe('group', param);
    }
    limit(param) {
        return this._pipe('limit', param);
    }
    match(param) {
        return this._pipe('match', _serializer_query__WEBPACK_IMPORTED_MODULE_2__["QuerySerializer"].encode(param));
    }
    project(param) {
        return this._pipe('project', param);
    }
    lookup(param) {
        return this._pipe('lookup', param);
    }
    replaceRoot(param) {
        return this._pipe('replaceRoot', param);
    }
    sample(param) {
        return this._pipe('sample', param);
    }
    skip(param) {
        return this._pipe('skip', param);
    }
    sort(param) {
        return this._pipe('sort', param);
    }
    sortByCount(param) {
        return this._pipe('sortByCount', param);
    }
    unwind(param) {
        return this._pipe('unwind', param);
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/collection.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/collection.js ***!
  \*****************************************************************/
/*! exports provided: CollectionReference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionReference", function() { return CollectionReference; });
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document */ "./node_modules/@cloudbase/database/dist/esm/document.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./node_modules/@cloudbase/database/dist/esm/query.js");
/* harmony import */ var _aggregate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aggregate */ "./node_modules/@cloudbase/database/dist/esm/aggregate.js");



class CollectionReference extends _query__WEBPACK_IMPORTED_MODULE_1__["Query"] {
    constructor(db, coll) {
        super(db, coll);
    }
    get name() {
        return this._coll;
    }
    doc(docID) {
        if (typeof docID !== 'string' && typeof docID !== 'number') {
            throw new Error('docId必须为字符串或数字');
        }
        return new _document__WEBPACK_IMPORTED_MODULE_0__["DocumentReference"](this._db, this._coll, docID);
    }
    add(data, callback) {
        let docRef = new _document__WEBPACK_IMPORTED_MODULE_0__["DocumentReference"](this._db, this._coll, undefined);
        return docRef.create(data, callback);
    }
    aggregate() {
        return new _aggregate__WEBPACK_IMPORTED_MODULE_2__["default"](this._db, this._coll);
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/command.js":
/*!**************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/command.js ***!
  \**************************************************************/
/*! exports provided: Command, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
/* harmony import */ var _commands_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/query */ "./node_modules/@cloudbase/database/dist/esm/commands/query.js");
/* harmony import */ var _commands_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/logic */ "./node_modules/@cloudbase/database/dist/esm/commands/logic.js");
/* harmony import */ var _commands_update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commands/update */ "./node_modules/@cloudbase/database/dist/esm/commands/update.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _aggregate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./aggregate */ "./node_modules/@cloudbase/database/dist/esm/aggregate.js");





const Command = {
    eq(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].EQ, [val]);
    },
    neq(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].NEQ, [val]);
    },
    lt(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].LT, [val]);
    },
    lte(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].LTE, [val]);
    },
    gt(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GT, [val]);
    },
    gte(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GTE, [val]);
    },
    in(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].IN, val);
    },
    nin(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].NIN, val);
    },
    all(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].ALL, val);
    },
    elemMatch(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].ELEM_MATCH, [val]);
    },
    exists(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].EXISTS, [val]);
    },
    size(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].SIZE, [val]);
    },
    mod(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].MOD, [val]);
    },
    geoNear(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GEO_NEAR, [val]);
    },
    geoWithin(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GEO_WITHIN, [val]);
    },
    geoIntersects(val) {
        return new _commands_query__WEBPACK_IMPORTED_MODULE_0__["QueryCommand"](_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GEO_INTERSECTS, [val]);
    },
    and(...__expressions__) {
        const expressions = Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LogicCommand"](_commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].AND, expressions);
    },
    nor(...__expressions__) {
        const expressions = Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LogicCommand"](_commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].NOR, expressions);
    },
    or(...__expressions__) {
        const expressions = Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LogicCommand"](_commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].OR, expressions);
    },
    not(...__expressions__) {
        const expressions = Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LogicCommand"](_commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].NOT, expressions);
    },
    set(val) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].SET, [val]);
    },
    remove() {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].REMOVE, []);
    },
    inc(val) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].INC, [val]);
    },
    mul(val) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].MUL, [val]);
    },
    push(...args) {
        let values;
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isObject"])(args[0]) && args[0].hasOwnProperty('each')) {
            const options = args[0];
            values = {
                $each: options.each,
                $position: options.position,
                $sort: options.sort,
                $slice: options.slice
            };
        }
        else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(args[0])) {
            values = args[0];
        }
        else {
            values = Array.from(args);
        }
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].PUSH, values);
    },
    pull(values) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].PULL, values);
    },
    pullAll(values) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].PULL_ALL, values);
    },
    pop() {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].POP, []);
    },
    shift() {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].SHIFT, []);
    },
    unshift(...__values__) {
        const values = Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].UNSHIFT, values);
    },
    addToSet(values) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].ADD_TO_SET, values);
    },
    rename(values) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].RENAME, [values]);
    },
    bit(values) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].BIT, [values]);
    },
    max(values) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].MAX, [values]);
    },
    min(values) {
        return new _commands_update__WEBPACK_IMPORTED_MODULE_2__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].MIN, [values]);
    },
    expr(values) {
        return {
            $expr: values
        };
    },
    jsonSchema(schema) {
        return {
            $jsonSchema: schema
        };
    },
    text(values) {
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isString"])(values)) {
            return {
                $search: values.search
            };
        }
        else {
            return {
                $search: values.search,
                $language: values.language,
                $caseSensitive: values.caseSensitive,
                $diacriticSensitive: values.diacriticSensitive
            };
        }
    },
    aggregate: {
        pipeline() {
            return new _aggregate__WEBPACK_IMPORTED_MODULE_4__["default"]();
        },
        abs: (param) => new AggregationOperator('abs', param),
        add: (param) => new AggregationOperator('add', param),
        ceil: (param) => new AggregationOperator('ceil', param),
        divide: (param) => new AggregationOperator('divide', param),
        exp: (param) => new AggregationOperator('exp', param),
        floor: (param) => new AggregationOperator('floor', param),
        ln: (param) => new AggregationOperator('ln', param),
        log: (param) => new AggregationOperator('log', param),
        log10: (param) => new AggregationOperator('log10', param),
        mod: (param) => new AggregationOperator('mod', param),
        multiply: (param) => new AggregationOperator('multiply', param),
        pow: (param) => new AggregationOperator('pow', param),
        sqrt: (param) => new AggregationOperator('sqrt', param),
        subtract: (param) => new AggregationOperator('subtract', param),
        trunc: (param) => new AggregationOperator('trunc', param),
        arrayElemAt: (param) => new AggregationOperator('arrayElemAt', param),
        arrayToObject: (param) => new AggregationOperator('arrayToObject', param),
        concatArrays: (param) => new AggregationOperator('concatArrays', param),
        filter: (param) => new AggregationOperator('filter', param),
        in: (param) => new AggregationOperator('in', param),
        indexOfArray: (param) => new AggregationOperator('indexOfArray', param),
        isArray: (param) => new AggregationOperator('isArray', param),
        map: (param) => new AggregationOperator('map', param),
        range: (param) => new AggregationOperator('range', param),
        reduce: (param) => new AggregationOperator('reduce', param),
        reverseArray: (param) => new AggregationOperator('reverseArray', param),
        size: (param) => new AggregationOperator('size', param),
        slice: (param) => new AggregationOperator('slice', param),
        zip: (param) => new AggregationOperator('zip', param),
        and: (param) => new AggregationOperator('and', param),
        not: (param) => new AggregationOperator('not', param),
        or: (param) => new AggregationOperator('or', param),
        cmp: (param) => new AggregationOperator('cmp', param),
        eq: (param) => new AggregationOperator('eq', param),
        gt: (param) => new AggregationOperator('gt', param),
        gte: (param) => new AggregationOperator('gte', param),
        lt: (param) => new AggregationOperator('lt', param),
        lte: (param) => new AggregationOperator('lte', param),
        neq: (param) => new AggregationOperator('ne', param),
        cond: (param) => new AggregationOperator('cond', param),
        ifNull: (param) => new AggregationOperator('ifNull', param),
        switch: (param) => new AggregationOperator('switch', param),
        dateFromParts: (param) => new AggregationOperator('dateFromParts', param),
        dateFromString: (param) => new AggregationOperator('dateFromString', param),
        dayOfMonth: (param) => new AggregationOperator('dayOfMonth', param),
        dayOfWeek: (param) => new AggregationOperator('dayOfWeek', param),
        dayOfYear: (param) => new AggregationOperator('dayOfYear', param),
        isoDayOfWeek: (param) => new AggregationOperator('isoDayOfWeek', param),
        isoWeek: (param) => new AggregationOperator('isoWeek', param),
        isoWeekYear: (param) => new AggregationOperator('isoWeekYear', param),
        millisecond: (param) => new AggregationOperator('millisecond', param),
        minute: (param) => new AggregationOperator('minute', param),
        month: (param) => new AggregationOperator('month', param),
        second: (param) => new AggregationOperator('second', param),
        hour: (param) => new AggregationOperator('hour', param),
        week: (param) => new AggregationOperator('week', param),
        year: (param) => new AggregationOperator('year', param),
        literal: (param) => new AggregationOperator('literal', param),
        mergeObjects: (param) => new AggregationOperator('mergeObjects', param),
        objectToArray: (param) => new AggregationOperator('objectToArray', param),
        allElementsTrue: (param) => new AggregationOperator('allElementsTrue', param),
        anyElementTrue: (param) => new AggregationOperator('anyElementTrue', param),
        setDifference: (param) => new AggregationOperator('setDifference', param),
        setEquals: (param) => new AggregationOperator('setEquals', param),
        setIntersection: (param) => new AggregationOperator('setIntersection', param),
        setIsSubset: (param) => new AggregationOperator('setIsSubset', param),
        setUnion: (param) => new AggregationOperator('setUnion', param),
        concat: (param) => new AggregationOperator('concat', param),
        dateToString: (param) => new AggregationOperator('dateToString', param),
        indexOfBytes: (param) => new AggregationOperator('indexOfBytes', param),
        indexOfCP: (param) => new AggregationOperator('indexOfCP', param),
        split: (param) => new AggregationOperator('split', param),
        strLenBytes: (param) => new AggregationOperator('strLenBytes', param),
        strLenCP: (param) => new AggregationOperator('strLenCP', param),
        strcasecmp: (param) => new AggregationOperator('strcasecmp', param),
        substr: (param) => new AggregationOperator('substr', param),
        substrBytes: (param) => new AggregationOperator('substrBytes', param),
        substrCP: (param) => new AggregationOperator('substrCP', param),
        toLower: (param) => new AggregationOperator('toLower', param),
        toUpper: (param) => new AggregationOperator('toUpper', param),
        meta: (param) => new AggregationOperator('meta', param),
        addToSet: (param) => new AggregationOperator('addToSet', param),
        avg: (param) => new AggregationOperator('avg', param),
        first: (param) => new AggregationOperator('first', param),
        last: (param) => new AggregationOperator('last', param),
        max: (param) => new AggregationOperator('max', param),
        min: (param) => new AggregationOperator('min', param),
        push: (param) => new AggregationOperator('push', param),
        stdDevPop: (param) => new AggregationOperator('stdDevPop', param),
        stdDevSamp: (param) => new AggregationOperator('stdDevSamp', param),
        sum: (param) => new AggregationOperator('sum', param),
        let: (param) => new AggregationOperator('let', param)
    },
    project: {
        slice: (param) => new ProjectionOperator('slice', param),
        elemMatch: (param) => new ProjectionOperator('elemMatch', param)
    }
};
class AggregationOperator {
    constructor(name, param) {
        this['$' + name] = param;
    }
}
class ProjectionOperator {
    constructor(name, param) {
        this['$' + name] = param;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Command);


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/commands/logic.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/commands/logic.js ***!
  \*********************************************************************/
/*! exports provided: AND, OR, NOT, NOR, LOGIC_COMMANDS_LITERAL, LogicCommand, isLogicCommand, isKnownLogicCommand, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AND", function() { return AND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OR", function() { return OR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT", function() { return NOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOR", function() { return NOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIC_COMMANDS_LITERAL", function() { return LOGIC_COMMANDS_LITERAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogicCommand", function() { return LogicCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLogicCommand", function() { return isLogicCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKnownLogicCommand", function() { return isKnownLogicCommand; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./node_modules/@cloudbase/database/dist/esm/commands/query.js");


const AND = 'and';
const OR = 'or';
const NOT = 'not';
const NOR = 'nor';
var LOGIC_COMMANDS_LITERAL;
(function (LOGIC_COMMANDS_LITERAL) {
    LOGIC_COMMANDS_LITERAL["AND"] = "and";
    LOGIC_COMMANDS_LITERAL["OR"] = "or";
    LOGIC_COMMANDS_LITERAL["NOT"] = "not";
    LOGIC_COMMANDS_LITERAL["NOR"] = "nor";
})(LOGIC_COMMANDS_LITERAL || (LOGIC_COMMANDS_LITERAL = {}));
class LogicCommand {
    constructor(operator, operands, fieldName) {
        this._internalType = _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_LOGIC_COMMAND"];
        Object.defineProperties(this, {
            _internalType: {
                enumerable: false,
                configurable: false,
            },
        });
        this.operator = operator;
        this.operands = operands;
        this.fieldName = fieldName || _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_UNSET_FIELD_NAME"];
        if (this.fieldName !== _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_UNSET_FIELD_NAME"]) {
            if (Array.isArray(operands)) {
                operands = operands.slice();
                this.operands = operands;
                for (let i = 0, len = operands.length; i < len; i++) {
                    const query = operands[i];
                    if (isLogicCommand(query) || Object(_query__WEBPACK_IMPORTED_MODULE_1__["isQueryCommand"])(query)) {
                        operands[i] = query._setFieldName(this.fieldName);
                    }
                }
            }
            else {
                const query = operands;
                if (isLogicCommand(query) || Object(_query__WEBPACK_IMPORTED_MODULE_1__["isQueryCommand"])(query)) {
                    operands = query._setFieldName(this.fieldName);
                }
            }
        }
    }
    _setFieldName(fieldName) {
        const operands = this.operands.map(operand => {
            if (operand instanceof LogicCommand) {
                return operand._setFieldName(fieldName);
            }
            else {
                return operand;
            }
        });
        const command = new LogicCommand(this.operator, operands, fieldName);
        return command;
    }
    and(...__expressions__) {
        const expressions = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
        expressions.unshift(this);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.AND, expressions, this.fieldName);
    }
    or(...__expressions__) {
        const expressions = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
        expressions.unshift(this);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.OR, expressions, this.fieldName);
    }
}
function isLogicCommand(object) {
    return object && (object instanceof LogicCommand) && (object._internalType === _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_LOGIC_COMMAND"]);
}
function isKnownLogicCommand(object) {
    return isLogicCommand && (object.operator.toUpperCase() in LOGIC_COMMANDS_LITERAL);
}
/* harmony default export */ __webpack_exports__["default"] = (LogicCommand);


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/commands/query.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/commands/query.js ***!
  \*********************************************************************/
/*! exports provided: EQ, NEQ, GT, GTE, LT, LTE, IN, NIN, ALL, ELEM_MATCH, EXISTS, SIZE, MOD, QUERY_COMMANDS_LITERAL, QueryCommand, isQueryCommand, isKnownQueryCommand, isComparisonCommand, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EQ", function() { return EQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEQ", function() { return NEQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GT", function() { return GT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GTE", function() { return GTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LT", function() { return LT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LTE", function() { return LTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IN", function() { return IN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NIN", function() { return NIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL", function() { return ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ELEM_MATCH", function() { return ELEM_MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXISTS", function() { return EXISTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIZE", function() { return SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOD", function() { return MOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_COMMANDS_LITERAL", function() { return QUERY_COMMANDS_LITERAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryCommand", function() { return QueryCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isQueryCommand", function() { return isQueryCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKnownQueryCommand", function() { return isKnownQueryCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComparisonCommand", function() { return isComparisonCommand; });
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ "./node_modules/@cloudbase/database/dist/esm/commands/logic.js");
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _geo_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geo/index */ "./node_modules/@cloudbase/database/dist/esm/geo/index.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");




const EQ = 'eq';
const NEQ = 'neq';
const GT = 'gt';
const GTE = 'gte';
const LT = 'lt';
const LTE = 'lte';
const IN = 'in';
const NIN = 'nin';
const ALL = 'all';
const ELEM_MATCH = 'elemMatch';
const EXISTS = 'exists';
const SIZE = 'size';
const MOD = 'mod';
var QUERY_COMMANDS_LITERAL;
(function (QUERY_COMMANDS_LITERAL) {
    QUERY_COMMANDS_LITERAL["EQ"] = "eq";
    QUERY_COMMANDS_LITERAL["NEQ"] = "neq";
    QUERY_COMMANDS_LITERAL["GT"] = "gt";
    QUERY_COMMANDS_LITERAL["GTE"] = "gte";
    QUERY_COMMANDS_LITERAL["LT"] = "lt";
    QUERY_COMMANDS_LITERAL["LTE"] = "lte";
    QUERY_COMMANDS_LITERAL["IN"] = "in";
    QUERY_COMMANDS_LITERAL["NIN"] = "nin";
    QUERY_COMMANDS_LITERAL["ALL"] = "all";
    QUERY_COMMANDS_LITERAL["ELEM_MATCH"] = "elemMatch";
    QUERY_COMMANDS_LITERAL["EXISTS"] = "exists";
    QUERY_COMMANDS_LITERAL["SIZE"] = "size";
    QUERY_COMMANDS_LITERAL["MOD"] = "mod";
    QUERY_COMMANDS_LITERAL["GEO_NEAR"] = "geoNear";
    QUERY_COMMANDS_LITERAL["GEO_WITHIN"] = "geoWithin";
    QUERY_COMMANDS_LITERAL["GEO_INTERSECTS"] = "geoIntersects";
})(QUERY_COMMANDS_LITERAL || (QUERY_COMMANDS_LITERAL = {}));
class QueryCommand extends _logic__WEBPACK_IMPORTED_MODULE_0__["LogicCommand"] {
    constructor(operator, operands, fieldName) {
        super(operator, operands, fieldName);
        this.operator = operator;
        this._internalType = _helper_symbol__WEBPACK_IMPORTED_MODULE_1__["SYMBOL_QUERY_COMMAND"];
    }
    toJSON() {
        switch (this.operator) {
            case QUERY_COMMANDS_LITERAL.IN:
            case QUERY_COMMANDS_LITERAL.NIN:
                return {
                    ['$' + this.operator]: this.operands
                };
            default:
                return {
                    ['$' + this.operator]: this.operands[0]
                };
        }
    }
    _setFieldName(fieldName) {
        const command = new QueryCommand(this.operator, this.operands, fieldName);
        return command;
    }
    eq(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.EQ, [val], this.fieldName);
        return this.and(command);
    }
    neq(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.NEQ, [val], this.fieldName);
        return this.and(command);
    }
    gt(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.GT, [val], this.fieldName);
        return this.and(command);
    }
    gte(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.GTE, [val], this.fieldName);
        return this.and(command);
    }
    lt(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.LT, [val], this.fieldName);
        return this.and(command);
    }
    lte(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.LTE, [val], this.fieldName);
        return this.and(command);
    }
    in(list) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.IN, list, this.fieldName);
        return this.and(command);
    }
    nin(list) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.NIN, list, this.fieldName);
        return this.and(command);
    }
    geoNear(val) {
        if (!(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["Point"])) {
            throw new TypeError(`"geometry" must be of type Point. Received type ${typeof val.geometry}`);
        }
        if (val.maxDistance !== undefined && !Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isNumber"])(val.maxDistance)) {
            throw new TypeError(`"maxDistance" must be of type Number. Received type ${typeof val.maxDistance}`);
        }
        if (val.minDistance !== undefined && !Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isNumber"])(val.minDistance)) {
            throw new TypeError(`"minDistance" must be of type Number. Received type ${typeof val.minDistance}`);
        }
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.GEO_NEAR, [val], this.fieldName);
        return this.and(command);
    }
    geoWithin(val) {
        if (!(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["MultiPolygon"]) && !(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["Polygon"])) {
            throw new TypeError(`"geometry" must be of type Polygon or MultiPolygon. Received type ${typeof val.geometry}`);
        }
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.GEO_WITHIN, [val], this.fieldName);
        return this.and(command);
    }
    geoIntersects(val) {
        if (!(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["Point"]) &&
            !(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["LineString"]) &&
            !(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["Polygon"]) &&
            !(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["MultiPoint"]) &&
            !(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["MultiLineString"]) &&
            !(val.geometry instanceof _geo_index__WEBPACK_IMPORTED_MODULE_2__["MultiPolygon"])) {
            throw new TypeError(`"geometry" must be of type Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon. Received type ${typeof val.geometry}`);
        }
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.GEO_INTERSECTS, [val], this.fieldName);
        return this.and(command);
    }
}
function isQueryCommand(object) {
    return object && object instanceof QueryCommand && object._internalType === _helper_symbol__WEBPACK_IMPORTED_MODULE_1__["SYMBOL_QUERY_COMMAND"];
}
function isKnownQueryCommand(object) {
    return isQueryCommand(object) && object.operator.toUpperCase() in QUERY_COMMANDS_LITERAL;
}
function isComparisonCommand(object) {
    return isQueryCommand(object);
}
/* harmony default export */ __webpack_exports__["default"] = (QueryCommand);


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/commands/update.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/commands/update.js ***!
  \**********************************************************************/
/*! exports provided: UPDATE_COMMANDS_LITERAL, UpdateCommand, isUpdateCommand, isKnownUpdateCommand, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_COMMANDS_LITERAL", function() { return UPDATE_COMMANDS_LITERAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateCommand", function() { return UpdateCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUpdateCommand", function() { return isUpdateCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKnownUpdateCommand", function() { return isKnownUpdateCommand; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");

var UPDATE_COMMANDS_LITERAL;
(function (UPDATE_COMMANDS_LITERAL) {
    UPDATE_COMMANDS_LITERAL["SET"] = "set";
    UPDATE_COMMANDS_LITERAL["REMOVE"] = "remove";
    UPDATE_COMMANDS_LITERAL["INC"] = "inc";
    UPDATE_COMMANDS_LITERAL["MUL"] = "mul";
    UPDATE_COMMANDS_LITERAL["PUSH"] = "push";
    UPDATE_COMMANDS_LITERAL["PULL"] = "pull";
    UPDATE_COMMANDS_LITERAL["PULL_ALL"] = "pullAll";
    UPDATE_COMMANDS_LITERAL["POP"] = "pop";
    UPDATE_COMMANDS_LITERAL["SHIFT"] = "shift";
    UPDATE_COMMANDS_LITERAL["UNSHIFT"] = "unshift";
    UPDATE_COMMANDS_LITERAL["ADD_TO_SET"] = "addToSet";
    UPDATE_COMMANDS_LITERAL["BIT"] = "bit";
    UPDATE_COMMANDS_LITERAL["RENAME"] = "rename";
    UPDATE_COMMANDS_LITERAL["MAX"] = "max";
    UPDATE_COMMANDS_LITERAL["MIN"] = "min";
})(UPDATE_COMMANDS_LITERAL || (UPDATE_COMMANDS_LITERAL = {}));
class UpdateCommand {
    constructor(operator, operands, fieldName) {
        this._internalType = _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_UPDATE_COMMAND"];
        Object.defineProperties(this, {
            _internalType: {
                enumerable: false,
                configurable: false,
            },
        });
        this.operator = operator;
        this.operands = operands;
        this.fieldName = fieldName || _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_UNSET_FIELD_NAME"];
    }
    _setFieldName(fieldName) {
        const command = new UpdateCommand(this.operator, this.operands, fieldName);
        return command;
    }
}
function isUpdateCommand(object) {
    return object && (object instanceof UpdateCommand) && (object._internalType === _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_UPDATE_COMMAND"]);
}
function isKnownUpdateCommand(object) {
    return isUpdateCommand(object) && (object.operator.toUpperCase() in UPDATE_COMMANDS_LITERAL);
}
/* harmony default export */ __webpack_exports__["default"] = (UpdateCommand);


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/config/error.config.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/config/error.config.js ***!
  \**************************************************************************/
/*! exports provided: ERR_CODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERR_CODE", function() { return ERR_CODE; });
const ERR_CODE = {
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    SDK_DATABASE_REALTIME_LISTENER_INIT_WATCH_FAIL: 'SDK_DATABASE_REALTIME_LISTENER_INIT_WATCH_FAIL',
    SDK_DATABASE_REALTIME_LISTENER_RECONNECT_WATCH_FAIL: 'SDK_DATABASE_REALTIME_LISTENER_RECONNECT_WATCH_FAIL',
    SDK_DATABASE_REALTIME_LISTENER_REBUILD_WATCH_FAIL: 'SDK_DATABASE_REALTIME_LISTENER_REBUILD_WATCH_FAIL',
    SDK_DATABASE_REALTIME_LISTENER_CLOSE_WATCH_FAIL: 'SDK_DATABASE_REALTIME_LISTENER_CLOSE_WATCH_FAIL',
    SDK_DATABASE_REALTIME_LISTENER_SERVER_ERROR_MSG: 'SDK_DATABASE_REALTIME_LISTENER_SERVER_ERROR_MSG',
    SDK_DATABASE_REALTIME_LISTENER_RECEIVE_INVALID_SERVER_DATA: 'SDK_DATABASE_REALTIME_LISTENER_RECEIVE_INVALID_SERVER_DATA',
    SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_ERROR: 'SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_ERROR',
    SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_CLOSED: 'SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_CLOSED',
    SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL: 'SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL',
    SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR: 'SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR'
};


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/constant.js":
/*!***************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/constant.js ***!
  \***************************************************************/
/*! exports provided: ErrorCode, FieldType, WhereFilterOpList, Opeartor, OperatorMap, OrderDirectionList, UpdateOperatorList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorCode", function() { return ErrorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return FieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhereFilterOpList", function() { return WhereFilterOpList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Opeartor", function() { return Opeartor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperatorMap", function() { return OperatorMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDirectionList", function() { return OrderDirectionList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateOperatorList", function() { return UpdateOperatorList; });
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["DocIDError"] = "\u6587\u6863ID\u4E0D\u5408\u6CD5";
    ErrorCode["CollNameError"] = "\u96C6\u5408\u540D\u79F0\u4E0D\u5408\u6CD5";
    ErrorCode["OpStrError"] = "\u64CD\u4F5C\u7B26\u4E0D\u5408\u6CD5";
    ErrorCode["DirectionError"] = "\u6392\u5E8F\u5B57\u7B26\u4E0D\u5408\u6CD5";
    ErrorCode["IntergerError"] = "must be integer";
})(ErrorCode || (ErrorCode = {}));
const FieldType = {
    String: 'String',
    Number: 'Number',
    Object: 'Object',
    Array: 'Array',
    Boolean: 'Boolean',
    Null: 'Null',
    GeoPoint: 'GeoPoint',
    GeoLineString: 'GeoLineString',
    GeoPolygon: 'GeoPolygon',
    GeoMultiPoint: 'GeoMultiPoint',
    GeoMultiLineString: 'GeoMultiLineString',
    GeoMultiPolygon: 'GeoMultiPolygon',
    Timestamp: 'Date',
    Command: 'Command',
    ServerDate: 'ServerDate'
};
const OrderDirectionList = ['desc', 'asc'];
const WhereFilterOpList = ['<', '<=', '==', '>=', '>'];
var Opeartor;
(function (Opeartor) {
    Opeartor["lt"] = "<";
    Opeartor["gt"] = ">";
    Opeartor["lte"] = "<=";
    Opeartor["gte"] = ">=";
    Opeartor["eq"] = "==";
})(Opeartor || (Opeartor = {}));
const OperatorMap = {
    [Opeartor.eq]: '$eq',
    [Opeartor.lt]: '$lt',
    [Opeartor.lte]: '$lte',
    [Opeartor.gt]: '$gt',
    [Opeartor.gte]: '$gte'
};
const UpdateOperatorList = [
    '$set',
    '$inc',
    '$mul',
    '$unset',
    '$push',
    '$pop',
    '$unshift',
    '$shift',
    '$currentDate',
    '$each',
    '$position'
];



/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/document.js":
/*!***************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/document.js ***!
  \***************************************************************/
/*! exports provided: DocumentReference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentReference", function() { return DocumentReference; });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/util */ "./node_modules/@cloudbase/database/dist/esm/lib/util.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./node_modules/@cloudbase/database/dist/esm/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/@cloudbase/database/dist/esm/util.js");
/* harmony import */ var _serializer_update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./serializer/update */ "./node_modules/@cloudbase/database/dist/esm/serializer/update.js");
/* harmony import */ var _serializer_datatype__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./serializer/datatype */ "./node_modules/@cloudbase/database/dist/esm/serializer/datatype.js");
/* harmony import */ var _commands_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commands/update */ "./node_modules/@cloudbase/database/dist/esm/commands/update.js");
/* harmony import */ var _realtime_websocket_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./realtime/websocket-client */ "./node_modules/@cloudbase/database/dist/esm/realtime/websocket-client.js");







class DocumentReference {
    constructor(db, coll, docID, projection = {}) {
        this.watch = (options) => {
            if (!_index__WEBPACK_IMPORTED_MODULE_1__["Db"].ws) {
                _index__WEBPACK_IMPORTED_MODULE_1__["Db"].ws = new _realtime_websocket_client__WEBPACK_IMPORTED_MODULE_6__["RealtimeWebSocketClient"]({
                    context: {
                        appConfig: {
                            docSizeLimit: 1000,
                            realtimePingInterval: 10000,
                            realtimePongWaitTimeout: 5000,
                            getAccessToken: this._getAccessToken
                        }
                    }
                });
            }
            return _index__WEBPACK_IMPORTED_MODULE_1__["Db"].ws.watch(Object.assign(Object.assign({}, options), { envId: this._db.config.env, collectionName: this._coll, query: JSON.stringify({
                    _id: this.id
                }) }));
        };
        this._db = db;
        this._coll = coll;
        this.id = docID;
        this.request = new _index__WEBPACK_IMPORTED_MODULE_1__["Db"].reqClass(this._db.config);
        this.projection = projection;
        this._getAccessToken = _index__WEBPACK_IMPORTED_MODULE_1__["Db"].getAccessToken;
    }
    create(data, callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        let params = {
            collectionName: this._coll,
            data: Object(_serializer_datatype__WEBPACK_IMPORTED_MODULE_4__["serialize"])(data)
        };
        if (this.id) {
            params['_id'] = this.id;
        }
        this.request
            .send('database.addDocument', params)
            .then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                callback(0, {
                    id: res.data._id,
                    requestId: res.requestId
                });
            }
        })
            .catch(err => {
            callback(err);
        });
        return callback.promise;
    }
    set(data, callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        if (!this.id) {
            return Promise.resolve({
                code: 'INVALID_PARAM',
                message: 'docId不能为空'
            });
        }
        if (!data || typeof data !== 'object') {
            return Promise.resolve({
                code: 'INVALID_PARAM',
                message: '参数必需是非空对象'
            });
        }
        if (data.hasOwnProperty('_id')) {
            return Promise.resolve({
                code: 'INVALID_PARAM',
                message: '不能更新_id的值'
            });
        }
        let hasOperator = false;
        const checkMixed = objs => {
            if (typeof objs === 'object') {
                for (let key in objs) {
                    if (objs[key] instanceof _commands_update__WEBPACK_IMPORTED_MODULE_5__["UpdateCommand"]) {
                        hasOperator = true;
                    }
                    else if (typeof objs[key] === 'object') {
                        checkMixed(objs[key]);
                    }
                }
            }
        };
        checkMixed(data);
        if (hasOperator) {
            return Promise.resolve({
                code: 'DATABASE_REQUEST_FAILED',
                message: 'update operator complicit'
            });
        }
        const merge = false;
        let param = {
            collectionName: this._coll,
            data: Object(_serializer_datatype__WEBPACK_IMPORTED_MODULE_4__["serialize"])(data),
            multi: false,
            merge,
            upsert: true
        };
        if (this.id) {
            param['query'] = { _id: this.id };
        }
        this.request
            .send('database.updateDocument', param)
            .then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                callback(0, {
                    updated: res.data.updated,
                    upsertedId: res.data.upserted_id,
                    requestId: res.requestId
                });
            }
        })
            .catch(err => {
            callback(err);
        });
        return callback.promise;
    }
    update(data, callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        if (!data || typeof data !== 'object') {
            return Promise.resolve({
                code: 'INVALID_PARAM',
                message: '参数必需是非空对象'
            });
        }
        if (data.hasOwnProperty('_id')) {
            return Promise.resolve({
                code: 'INVALID_PARAM',
                message: '不能更新_id的值'
            });
        }
        const query = { _id: this.id };
        const merge = true;
        const param = {
            collectionName: this._coll,
            data: _serializer_update__WEBPACK_IMPORTED_MODULE_3__["UpdateSerializer"].encode(data),
            query: query,
            multi: false,
            merge,
            upsert: false
        };
        this.request
            .send('database.updateDocument', param)
            .then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                callback(0, {
                    updated: res.data.updated,
                    upsertedId: res.data.upserted_id,
                    requestId: res.requestId
                });
            }
        })
            .catch(err => {
            callback(err);
        });
        return callback.promise;
    }
    remove(callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        const query = { _id: this.id };
        const param = {
            collectionName: this._coll,
            query: query,
            multi: false
        };
        this.request
            .send('database.deleteDocument', param)
            .then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                callback(0, {
                    deleted: res.data.deleted,
                    requestId: res.requestId
                });
            }
        })
            .catch(err => {
            callback(err);
        });
        return callback.promise;
    }
    get(callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        const query = { _id: this.id };
        const param = {
            collectionName: this._coll,
            query: query,
            multi: false,
            projection: this.projection
        };
        this.request
            .send('database.queryDocument', param)
            .then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                const documents = _util__WEBPACK_IMPORTED_MODULE_2__["Util"].formatResDocumentData(res.data.list);
                callback(0, {
                    data: documents,
                    requestId: res.requestId,
                    total: res.TotalCount,
                    limit: res.Limit,
                    offset: res.Offset
                });
            }
        })
            .catch(err => {
            callback(err);
        });
        return callback.promise;
    }
    field(projection) {
        for (let k in projection) {
            if (projection[k]) {
                projection[k] = 1;
            }
            else {
                projection[k] = 0;
            }
        }
        return new DocumentReference(this._db, this._coll, this.id, projection);
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/geo/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/geo/index.js ***!
  \****************************************************************/
/*! exports provided: Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./node_modules/@cloudbase/database/dist/esm/geo/point.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _point__WEBPACK_IMPORTED_MODULE_0__["Point"]; });

/* harmony import */ var _lineString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lineString */ "./node_modules/@cloudbase/database/dist/esm/geo/lineString.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LineString", function() { return _lineString__WEBPACK_IMPORTED_MODULE_1__["LineString"]; });

/* harmony import */ var _polygon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polygon */ "./node_modules/@cloudbase/database/dist/esm/geo/polygon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return _polygon__WEBPACK_IMPORTED_MODULE_2__["Polygon"]; });

/* harmony import */ var _multiPoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./multiPoint */ "./node_modules/@cloudbase/database/dist/esm/geo/multiPoint.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiPoint", function() { return _multiPoint__WEBPACK_IMPORTED_MODULE_3__["MultiPoint"]; });

/* harmony import */ var _multiLineString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./multiLineString */ "./node_modules/@cloudbase/database/dist/esm/geo/multiLineString.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiLineString", function() { return _multiLineString__WEBPACK_IMPORTED_MODULE_4__["MultiLineString"]; });

/* harmony import */ var _multiPolygon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./multiPolygon */ "./node_modules/@cloudbase/database/dist/esm/geo/multiPolygon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiPolygon", function() { return _multiPolygon__WEBPACK_IMPORTED_MODULE_5__["MultiPolygon"]; });









/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/geo/lineString.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/geo/lineString.js ***!
  \*********************************************************************/
/*! exports provided: LineString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineString", function() { return LineString; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ "./node_modules/@cloudbase/database/dist/esm/geo/point.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");



class LineString {
    constructor(points) {
        if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isArray"])(points)) {
            throw new TypeError(`"points" must be of type Point[]. Received type ${typeof points}`);
        }
        if (points.length < 2) {
            throw new Error('"points" must contain 2 points at least');
        }
        points.forEach(point => {
            if (!(point instanceof _point__WEBPACK_IMPORTED_MODULE_1__["Point"])) {
                throw new TypeError(`"points" must be of type Point[]. Received type ${typeof point}[]`);
            }
        });
        this.points = points;
    }
    parse(key) {
        return {
            [key]: {
                type: 'LineString',
                coordinates: this.points.map(point => point.toJSON().coordinates)
            }
        };
    }
    toJSON() {
        return {
            type: 'LineString',
            coordinates: this.points.map(point => point.toJSON().coordinates)
        };
    }
    static validate(lineString) {
        if (lineString.type !== 'LineString' || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isArray"])(lineString.coordinates)) {
            return false;
        }
        for (let point of lineString.coordinates) {
            if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isNumber"])(point[0]) || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isNumber"])(point[1])) {
                return false;
            }
        }
        return true;
    }
    static isClosed(lineString) {
        const firstPoint = lineString.points[0];
        const lastPoint = lineString.points[lineString.points.length - 1];
        if (firstPoint.latitude === lastPoint.latitude && firstPoint.longitude === lastPoint.longitude) {
            return true;
        }
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_GEO_LINE_STRING"];
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/geo/multiLineString.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/geo/multiLineString.js ***!
  \**************************************************************************/
/*! exports provided: MultiLineString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiLineString", function() { return MultiLineString; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _lineString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lineString */ "./node_modules/@cloudbase/database/dist/esm/geo/lineString.js");



class MultiLineString {
    constructor(lines) {
        if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(lines)) {
            throw new TypeError(`"lines" must be of type LineString[]. Received type ${typeof lines}`);
        }
        if (lines.length === 0) {
            throw new Error('Polygon must contain 1 linestring at least');
        }
        lines.forEach(line => {
            if (!(line instanceof _lineString__WEBPACK_IMPORTED_MODULE_2__["LineString"])) {
                throw new TypeError(`"lines" must be of type LineString[]. Received type ${typeof line}[]`);
            }
        });
        this.lines = lines;
    }
    parse(key) {
        return {
            [key]: {
                type: 'MultiLineString',
                coordinates: this.lines.map(line => {
                    return line.points.map(point => [point.longitude, point.latitude]);
                })
            }
        };
    }
    toJSON() {
        return {
            type: 'MultiLineString',
            coordinates: this.lines.map(line => {
                return line.points.map(point => [point.longitude, point.latitude]);
            })
        };
    }
    static validate(multiLineString) {
        if (multiLineString.type !== 'MultiLineString' || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(multiLineString.coordinates)) {
            return false;
        }
        for (let line of multiLineString.coordinates) {
            for (let point of line) {
                if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(point[0]) || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(point[1])) {
                    return false;
                }
            }
        }
        return true;
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_GEO_MULTI_LINE_STRING"];
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/geo/multiPoint.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/geo/multiPoint.js ***!
  \*********************************************************************/
/*! exports provided: MultiPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiPoint", function() { return MultiPoint; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ "./node_modules/@cloudbase/database/dist/esm/geo/point.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");



class MultiPoint {
    constructor(points) {
        if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isArray"])(points)) {
            throw new TypeError(`"points" must be of type Point[]. Received type ${typeof points}`);
        }
        if (points.length === 0) {
            throw new Error('"points" must contain 1 point at least');
        }
        points.forEach(point => {
            if (!(point instanceof _point__WEBPACK_IMPORTED_MODULE_1__["Point"])) {
                throw new TypeError(`"points" must be of type Point[]. Received type ${typeof point}[]`);
            }
        });
        this.points = points;
    }
    parse(key) {
        return {
            [key]: {
                type: 'MultiPoint',
                coordinates: this.points.map(point => point.toJSON().coordinates)
            }
        };
    }
    toJSON() {
        return {
            type: 'MultiPoint',
            coordinates: this.points.map(point => point.toJSON().coordinates)
        };
    }
    static validate(multiPoint) {
        if (multiPoint.type !== 'MultiPoint' || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isArray"])(multiPoint.coordinates)) {
            return false;
        }
        for (let point of multiPoint.coordinates) {
            if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isNumber"])(point[0]) || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isNumber"])(point[1])) {
                return false;
            }
        }
        return true;
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_GEO_MULTI_POINT"];
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/geo/multiPolygon.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/geo/multiPolygon.js ***!
  \***********************************************************************/
/*! exports provided: MultiPolygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiPolygon", function() { return MultiPolygon; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _polygon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polygon */ "./node_modules/@cloudbase/database/dist/esm/geo/polygon.js");



class MultiPolygon {
    constructor(polygons) {
        if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(polygons)) {
            throw new TypeError(`"polygons" must be of type Polygon[]. Received type ${typeof polygons}`);
        }
        if (polygons.length === 0) {
            throw new Error('MultiPolygon must contain 1 polygon at least');
        }
        for (let polygon of polygons) {
            if (!(polygon instanceof _polygon__WEBPACK_IMPORTED_MODULE_2__["Polygon"])) {
                throw new TypeError(`"polygon" must be of type Polygon[]. Received type ${typeof polygon}[]`);
            }
        }
        this.polygons = polygons;
    }
    parse(key) {
        return {
            [key]: {
                type: 'MultiPolygon',
                coordinates: this.polygons.map(polygon => {
                    return polygon.lines.map(line => {
                        return line.points.map(point => [point.longitude, point.latitude]);
                    });
                })
            }
        };
    }
    toJSON() {
        return {
            type: 'MultiPolygon',
            coordinates: this.polygons.map(polygon => {
                return polygon.lines.map(line => {
                    return line.points.map(point => [point.longitude, point.latitude]);
                });
            })
        };
    }
    static validate(multiPolygon) {
        if (multiPolygon.type !== 'MultiPolygon' || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(multiPolygon.coordinates)) {
            return false;
        }
        for (let polygon of multiPolygon.coordinates) {
            for (let line of polygon) {
                for (let point of line) {
                    if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(point[0]) || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(point[1])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_GEO_POLYGON"];
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/geo/point.js":
/*!****************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/geo/point.js ***!
  \****************************************************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validate */ "./node_modules/@cloudbase/database/dist/esm/validate.js");
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");



class Point {
    constructor(longitude, latitude) {
        _validate__WEBPACK_IMPORTED_MODULE_0__["Validate"].isGeopoint('longitude', longitude);
        _validate__WEBPACK_IMPORTED_MODULE_0__["Validate"].isGeopoint('latitude', latitude);
        this.longitude = longitude;
        this.latitude = latitude;
    }
    parse(key) {
        return {
            [key]: {
                type: 'Point',
                coordinates: [this.longitude, this.latitude]
            }
        };
    }
    toJSON() {
        return {
            type: 'Point',
            coordinates: [
                this.longitude,
                this.latitude,
            ],
        };
    }
    toReadableString() {
        return `[${this.longitude},${this.latitude}]`;
    }
    static validate(point) {
        return point.type === 'Point' &&
            Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isArray"])(point.coordinates) &&
            _validate__WEBPACK_IMPORTED_MODULE_0__["Validate"].isGeopoint('longitude', point.coordinates[0]) &&
            _validate__WEBPACK_IMPORTED_MODULE_0__["Validate"].isGeopoint('latitude', point.coordinates[1]);
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_1__["SYMBOL_GEO_POINT"];
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/geo/polygon.js":
/*!******************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/geo/polygon.js ***!
  \******************************************************************/
/*! exports provided: Polygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return Polygon; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _lineString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lineString */ "./node_modules/@cloudbase/database/dist/esm/geo/lineString.js");



class Polygon {
    constructor(lines) {
        if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(lines)) {
            throw new TypeError(`"lines" must be of type LineString[]. Received type ${typeof lines}`);
        }
        if (lines.length === 0) {
            throw new Error('Polygon must contain 1 linestring at least');
        }
        lines.forEach(line => {
            if (!(line instanceof _lineString__WEBPACK_IMPORTED_MODULE_2__["LineString"])) {
                throw new TypeError(`"lines" must be of type LineString[]. Received type ${typeof line}[]`);
            }
            if (!_lineString__WEBPACK_IMPORTED_MODULE_2__["LineString"].isClosed(line)) {
                throw new Error(`LineString ${line.points.map(p => p.toReadableString())} is not a closed cycle`);
            }
        });
        this.lines = lines;
    }
    parse(key) {
        return {
            [key]: {
                type: 'Polygon',
                coordinates: this.lines.map(line => {
                    return line.points.map(point => [point.longitude, point.latitude]);
                })
            }
        };
    }
    toJSON() {
        return {
            type: 'Polygon',
            coordinates: this.lines.map(line => {
                return line.points.map(point => [point.longitude, point.latitude]);
            })
        };
    }
    static validate(polygon) {
        if (polygon.type !== 'Polygon' || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(polygon.coordinates)) {
            return false;
        }
        for (let line of polygon.coordinates) {
            if (!this.isCloseLineString(line)) {
                return false;
            }
            for (let point of line) {
                if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(point[0]) || !Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(point[1])) {
                    return false;
                }
            }
        }
        return true;
    }
    static isCloseLineString(lineString) {
        const firstPoint = lineString[0];
        const lastPoint = lineString[lineString.length - 1];
        if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
            return false;
        }
        return true;
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_GEO_MULTI_POLYGON"];
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js":
/*!********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/helper/symbol.js ***!
  \********************************************************************/
/*! exports provided: InternalSymbol, SYMBOL_UNSET_FIELD_NAME, SYMBOL_UPDATE_COMMAND, SYMBOL_QUERY_COMMAND, SYMBOL_LOGIC_COMMAND, SYMBOL_GEO_POINT, SYMBOL_GEO_LINE_STRING, SYMBOL_GEO_POLYGON, SYMBOL_GEO_MULTI_POINT, SYMBOL_GEO_MULTI_LINE_STRING, SYMBOL_GEO_MULTI_POLYGON, SYMBOL_SERVER_DATE, SYMBOL_REGEXP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_UNSET_FIELD_NAME", function() { return SYMBOL_UNSET_FIELD_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_UPDATE_COMMAND", function() { return SYMBOL_UPDATE_COMMAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_QUERY_COMMAND", function() { return SYMBOL_QUERY_COMMAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_LOGIC_COMMAND", function() { return SYMBOL_LOGIC_COMMAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_GEO_POINT", function() { return SYMBOL_GEO_POINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_GEO_LINE_STRING", function() { return SYMBOL_GEO_LINE_STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_GEO_POLYGON", function() { return SYMBOL_GEO_POLYGON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_GEO_MULTI_POINT", function() { return SYMBOL_GEO_MULTI_POINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_GEO_MULTI_LINE_STRING", function() { return SYMBOL_GEO_MULTI_LINE_STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_GEO_MULTI_POLYGON", function() { return SYMBOL_GEO_MULTI_POLYGON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_SERVER_DATE", function() { return SYMBOL_SERVER_DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_REGEXP", function() { return SYMBOL_REGEXP; });
/* harmony import */ var _utils_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/symbol */ "./node_modules/@cloudbase/database/dist/esm/utils/symbol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InternalSymbol", function() { return _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["InternalSymbol"]; });



const SYMBOL_UNSET_FIELD_NAME = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('UNSET_FIELD_NAME');
const SYMBOL_UPDATE_COMMAND = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('UPDATE_COMMAND');
const SYMBOL_QUERY_COMMAND = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('QUERY_COMMAND');
const SYMBOL_LOGIC_COMMAND = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('LOGIC_COMMAND');
const SYMBOL_GEO_POINT = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('GEO_POINT');
const SYMBOL_GEO_LINE_STRING = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('SYMBOL_GEO_LINE_STRING');
const SYMBOL_GEO_POLYGON = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('SYMBOL_GEO_POLYGON');
const SYMBOL_GEO_MULTI_POINT = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('SYMBOL_GEO_MULTI_POINT');
const SYMBOL_GEO_MULTI_LINE_STRING = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('SYMBOL_GEO_MULTI_LINE_STRING');
const SYMBOL_GEO_MULTI_POLYGON = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('SYMBOL_GEO_MULTI_POLYGON');
const SYMBOL_SERVER_DATE = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('SERVER_DATE');
const SYMBOL_REGEXP = _utils_symbol__WEBPACK_IMPORTED_MODULE_0__["default"].for('REGEXP');


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/index.js ***!
  \************************************************************/
/*! exports provided: Db */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Db", function() { return Db; });
/* harmony import */ var _geo_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geo/index */ "./node_modules/@cloudbase/database/dist/esm/geo/index.js");
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collection */ "./node_modules/@cloudbase/database/dist/esm/collection.js");
/* harmony import */ var _command__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./command */ "./node_modules/@cloudbase/database/dist/esm/command.js");
/* harmony import */ var _serverDate_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./serverDate/index */ "./node_modules/@cloudbase/database/dist/esm/serverDate/index.js");
/* harmony import */ var _regexp_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./regexp/index */ "./node_modules/@cloudbase/database/dist/esm/regexp/index.js");
/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transaction */ "./node_modules/@cloudbase/database/dist/esm/transaction.js");






class Db {
    constructor(config) {
        this.config = config;
        this.Geo = _geo_index__WEBPACK_IMPORTED_MODULE_0__;
        this.serverDate = _serverDate_index__WEBPACK_IMPORTED_MODULE_3__["ServerDateConstructor"];
        this.command = _command__WEBPACK_IMPORTED_MODULE_2__["Command"];
        this.RegExp = _regexp_index__WEBPACK_IMPORTED_MODULE_4__["RegExpConstructor"];
        this.startTransaction = _transaction__WEBPACK_IMPORTED_MODULE_5__["startTransaction"];
        this.runTransaction = _transaction__WEBPACK_IMPORTED_MODULE_5__["runTransaction"];
    }
    collection(collName) {
        if (!collName) {
            throw new Error('Collection name is required');
        }
        return new _collection__WEBPACK_IMPORTED_MODULE_1__["CollectionReference"](this, collName);
    }
    createCollection(collName) {
        let request = new Db.reqClass(this.config);
        const params = {
            collectionName: collName
        };
        return request.send('database.addCollection', params);
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/lib/util.js":
/*!***************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/lib/util.js ***!
  \***************************************************************/
/*! exports provided: createPromiseCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPromiseCallback", function() { return createPromiseCallback; });
const createPromiseCallback = () => {
    let cb;
    if (!Promise) {
        cb = () => { };
        cb.promise = {};
        const throwPromiseNotDefined = () => {
            throw new Error('Your Node runtime does support ES6 Promises. ' +
                'Set "global.Promise" to your preferred implementation of promises.');
        };
        Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
        Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
        return cb;
    }
    const promise = new Promise((resolve, reject) => {
        cb = (err, data) => {
            if (err)
                return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
};


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/operator-map.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/operator-map.js ***!
  \*******************************************************************/
/*! exports provided: OperatorMap, operatorToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperatorMap", function() { return OperatorMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorToString", function() { return operatorToString; });
/* harmony import */ var _commands_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/query */ "./node_modules/@cloudbase/database/dist/esm/commands/query.js");
/* harmony import */ var _commands_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/logic */ "./node_modules/@cloudbase/database/dist/esm/commands/logic.js");
/* harmony import */ var _commands_update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commands/update */ "./node_modules/@cloudbase/database/dist/esm/commands/update.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_3__);




const OperatorMap = {};
for (const key in _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"]) {
    OperatorMap[key] = '$' + camelcase__WEBPACK_IMPORTED_MODULE_3__(key);
}
for (const key in _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"]) {
    OperatorMap[key] = '$' + camelcase__WEBPACK_IMPORTED_MODULE_3__(key);
}
for (const key in _commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"]) {
    OperatorMap[key] = '$' + camelcase__WEBPACK_IMPORTED_MODULE_3__(key);
}
OperatorMap[_commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].NEQ] = '$ne';
OperatorMap[_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].REMOVE] = '$unset';
OperatorMap[_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].SHIFT] = '$pop';
OperatorMap[_commands_update__WEBPACK_IMPORTED_MODULE_2__["UPDATE_COMMANDS_LITERAL"].UNSHIFT] = '$push';
function operatorToString(operator) {
    return OperatorMap[operator] || ('$' + camelcase__WEBPACK_IMPORTED_MODULE_3__(operator));
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/query.js":
/*!************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/query.js ***!
  \************************************************************/
/*! exports provided: Query */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return Query; });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/util */ "./node_modules/@cloudbase/database/dist/esm/lib/util.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./node_modules/@cloudbase/database/dist/esm/index.js");
/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validate */ "./node_modules/@cloudbase/database/dist/esm/validate.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./node_modules/@cloudbase/database/dist/esm/util.js");
/* harmony import */ var _serializer_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./serializer/query */ "./node_modules/@cloudbase/database/dist/esm/serializer/query.js");
/* harmony import */ var _serializer_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./serializer/update */ "./node_modules/@cloudbase/database/dist/esm/serializer/update.js");
/* harmony import */ var _realtime_websocket_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./realtime/websocket-client */ "./node_modules/@cloudbase/database/dist/esm/realtime/websocket-client.js");







class Query {
    constructor(db, coll, fieldFilters, fieldOrders, queryOptions) {
        this.watch = (options) => {
            if (!_index__WEBPACK_IMPORTED_MODULE_1__["Db"].ws) {
                _index__WEBPACK_IMPORTED_MODULE_1__["Db"].ws = new _realtime_websocket_client__WEBPACK_IMPORTED_MODULE_6__["RealtimeWebSocketClient"]({
                    context: {
                        appConfig: {
                            docSizeLimit: 1000,
                            realtimePingInterval: 10000,
                            realtimePongWaitTimeout: 5000,
                            getAccessToken: this._getAccessToken
                        }
                    }
                });
            }
            return _index__WEBPACK_IMPORTED_MODULE_1__["Db"].ws.watch(Object.assign(Object.assign({}, options), { envId: this._db.config.env, collectionName: this._coll, query: JSON.stringify(this._fieldFilters) }));
        };
        this._db = db;
        this._coll = coll;
        this._fieldFilters = fieldFilters;
        this._fieldOrders = fieldOrders || [];
        this._queryOptions = queryOptions || {};
        this._request = new _index__WEBPACK_IMPORTED_MODULE_1__["Db"].reqClass(this._db.config);
        this._getAccessToken = _index__WEBPACK_IMPORTED_MODULE_1__["Db"].getAccessToken;
    }
    get(callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        let newOder = [];
        if (this._fieldOrders) {
            this._fieldOrders.forEach(order => {
                newOder.push(order);
            });
        }
        let param = {
            collectionName: this._coll
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        if (newOder.length > 0) {
            param.order = newOder;
        }
        if (this._queryOptions.offset) {
            param.offset = this._queryOptions.offset;
        }
        if (this._queryOptions.limit) {
            param.limit =
                this._queryOptions.limit < 100 ? this._queryOptions.limit : 100;
        }
        else {
            param.limit = 100;
        }
        if (this._queryOptions.projection) {
            param.projection = this._queryOptions.projection;
        }
        this._request
            .send('database.queryDocument', param)
            .then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                const documents = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].formatResDocumentData(res.data.list);
                const result = {
                    data: documents,
                    requestId: res.requestId
                };
                if (res.TotalCount)
                    result.total = res.TotalCount;
                if (res.Limit)
                    result.limit = res.Limit;
                if (res.Offset)
                    result.offset = res.Offset;
                callback(0, result);
            }
        })
            .catch(err => {
            callback(err);
        });
        return callback.promise;
    }
    count(callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        let param = {
            collectionName: this._coll
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        this._request.send('database.countDocument', param).then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                callback(0, {
                    requestId: res.requestId,
                    total: res.data.total
                });
            }
        });
        return callback.promise;
    }
    where(query) {
        return new Query(this._db, this._coll, _serializer_query__WEBPACK_IMPORTED_MODULE_4__["QuerySerializer"].encode(query), this._fieldOrders, this._queryOptions);
    }
    orderBy(fieldPath, directionStr) {
        _validate__WEBPACK_IMPORTED_MODULE_2__["Validate"].isFieldPath(fieldPath);
        _validate__WEBPACK_IMPORTED_MODULE_2__["Validate"].isFieldOrder(directionStr);
        const newOrder = {
            field: fieldPath,
            direction: directionStr
        };
        const combinedOrders = this._fieldOrders.concat(newOrder);
        return new Query(this._db, this._coll, this._fieldFilters, combinedOrders, this._queryOptions);
    }
    limit(limit) {
        _validate__WEBPACK_IMPORTED_MODULE_2__["Validate"].isInteger('limit', limit);
        let option = Object.assign({}, this._queryOptions);
        option.limit = limit;
        return new Query(this._db, this._coll, this._fieldFilters, this._fieldOrders, option);
    }
    skip(offset) {
        _validate__WEBPACK_IMPORTED_MODULE_2__["Validate"].isInteger('offset', offset);
        let option = Object.assign({}, this._queryOptions);
        option.offset = offset;
        return new Query(this._db, this._coll, this._fieldFilters, this._fieldOrders, option);
    }
    update(data, callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        if (!data || typeof data !== 'object') {
            return Promise.resolve({
                code: 'INVALID_PARAM',
                message: '参数必需是非空对象'
            });
        }
        if (data.hasOwnProperty('_id')) {
            return Promise.resolve({
                code: 'INVALID_PARAM',
                message: '不能更新_id的值'
            });
        }
        let param = {
            collectionName: this._coll,
            query: this._fieldFilters,
            multi: true,
            merge: true,
            upsert: false,
            data: _serializer_update__WEBPACK_IMPORTED_MODULE_5__["UpdateSerializer"].encode(data)
        };
        this._request.send('database.updateDocument', param).then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                callback(0, {
                    requestId: res.requestId,
                    updated: res.data.updated,
                    upsertId: res.data.upsert_id
                });
            }
        });
        return callback.promise;
    }
    field(projection) {
        for (let k in projection) {
            if (projection[k]) {
                if (typeof projection[k] !== 'object') {
                    projection[k] = 1;
                }
            }
            else {
                projection[k] = 0;
            }
        }
        let option = Object.assign({}, this._queryOptions);
        option.projection = projection;
        return new Query(this._db, this._coll, this._fieldFilters, this._fieldOrders, option);
    }
    remove(callback) {
        callback = callback || Object(_lib_util__WEBPACK_IMPORTED_MODULE_0__["createPromiseCallback"])();
        if (Object.keys(this._queryOptions).length > 0) {
            console.warn('`offset`, `limit` and `projection` are not supported in remove() operation');
        }
        if (this._fieldOrders.length > 0) {
            console.warn('`orderBy` is not supported in remove() operation');
        }
        const param = {
            collectionName: this._coll,
            query: _serializer_query__WEBPACK_IMPORTED_MODULE_4__["QuerySerializer"].encode(this._fieldFilters),
            multi: true
        };
        this._request.send('database.deleteDocument', param).then(res => {
            if (res.code) {
                callback(0, res);
            }
            else {
                callback(0, {
                    requestId: res.requestId,
                    deleted: res.data.deleted
                });
            }
        });
        return callback.promise;
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/realtime/error.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/realtime/error.js ***!
  \*********************************************************************/
/*! exports provided: RealtimeErrorMessageError, isRealtimeErrorMessageError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RealtimeErrorMessageError", function() { return RealtimeErrorMessageError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRealtimeErrorMessageError", function() { return isRealtimeErrorMessageError; });
class RealtimeErrorMessageError extends Error {
    constructor(serverErrorMsg) {
        super(`Watch Error ${JSON.stringify(serverErrorMsg.msgData)} (requestid: ${serverErrorMsg.requestId})`);
        this.isRealtimeErrorMessageError = true;
        this.payload = serverErrorMsg;
    }
}
const isRealtimeErrorMessageError = (e) => e && e.isRealtimeErrorMessageError;


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/realtime/listener.js":
/*!************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/realtime/listener.js ***!
  \************************************************************************/
/*! exports provided: RealtimeListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RealtimeListener", function() { return RealtimeListener; });
class RealtimeListener {
    constructor(options) {
        this.close = options.close;
        this.onChange = options.onChange;
        this.onError = options.onError;
        if (options.debug) {
            Object.defineProperty(this, 'virtualClient', {
                get: () => {
                    return options.virtualClient;
                }
            });
        }
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/realtime/message.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/realtime/message.js ***!
  \***********************************************************************/
/*! exports provided: genRequestId, isInitEventMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genRequestId", function() { return genRequestId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInitEventMessage", function() { return isInitEventMessage; });
function genRequestId(prefix = '') {
    return `${prefix ? `${prefix}_` : ''}${+new Date()}_${Math.random()}`;
}
function isInitEventMessage(msg) {
    return msg.msgType === 'INIT_EVENT';
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/realtime/snapshot.js":
/*!************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/realtime/snapshot.js ***!
  \************************************************************************/
/*! exports provided: Snapshot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snapshot", function() { return Snapshot; });
class Snapshot {
    constructor(options) {
        const { id, docChanges, docs, msgType, type } = options;
        let cachedDocChanges;
        let cachedDocs;
        Object.defineProperties(this, {
            id: {
                get: () => id,
                enumerable: true
            },
            docChanges: {
                get: () => {
                    if (!cachedDocChanges) {
                        cachedDocChanges = JSON.parse(JSON.stringify(docChanges));
                    }
                    return cachedDocChanges;
                },
                enumerable: true
            },
            docs: {
                get: () => {
                    if (!cachedDocs) {
                        cachedDocs = JSON.parse(JSON.stringify(docs));
                    }
                    return cachedDocs;
                },
                enumerable: true
            },
            msgType: {
                get: () => msgType,
                enumerable: true
            },
            type: {
                get: () => type,
                enumerable: true
            }
        });
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/realtime/virtual-websocket-client.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/realtime/virtual-websocket-client.js ***!
  \****************************************************************************************/
/*! exports provided: VirtualWebSocketClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualWebSocketClient", function() { return VirtualWebSocketClient; });
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/set */ "./node_modules/lodash/set.js");
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_unset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/unset */ "./node_modules/lodash/unset.js");
/* harmony import */ var lodash_unset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_unset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message */ "./node_modules/@cloudbase/database/dist/esm/realtime/message.js");
/* harmony import */ var _utils_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/error */ "./node_modules/@cloudbase/database/dist/esm/utils/error.js");
/* harmony import */ var _config_error_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/error.config */ "./node_modules/@cloudbase/database/dist/esm/config/error.config.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/utils */ "./node_modules/@cloudbase/database/dist/esm/utils/utils.js");
/* harmony import */ var _listener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listener */ "./node_modules/@cloudbase/database/dist/esm/realtime/listener.js");
/* harmony import */ var _snapshot__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./snapshot */ "./node_modules/@cloudbase/database/dist/esm/realtime/snapshot.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./error */ "./node_modules/@cloudbase/database/dist/esm/realtime/error.js");










var WATCH_STATUS;
(function (WATCH_STATUS) {
    WATCH_STATUS["LOGGINGIN"] = "LOGGINGIN";
    WATCH_STATUS["INITING"] = "INITING";
    WATCH_STATUS["REBUILDING"] = "REBUILDING";
    WATCH_STATUS["ACTIVE"] = "ACTIVE";
    WATCH_STATUS["ERRORED"] = "ERRORED";
    WATCH_STATUS["CLOSING"] = "CLOSING";
    WATCH_STATUS["CLOSED"] = "CLOSED";
    WATCH_STATUS["PAUSED"] = "PAUSED";
    WATCH_STATUS["RESUMING"] = "RESUMING";
})(WATCH_STATUS || (WATCH_STATUS = {}));
const DEFAULT_WAIT_TIME_ON_UNKNOWN_ERROR = 100;
const DEFAULT_MAX_AUTO_RETRY_ON_ERROR = 2;
const DEFAULT_MAX_SEND_ACK_AUTO_RETRY_ON_ERROR = 2;
const DEFAULT_SEND_ACK_DEBOUNCE_TIMEOUT = 10 * 1000;
const DEFAULT_INIT_WATCH_TIMEOUT = 10 * 1000;
const DEFAULT_REBUILD_WATCH_TIMEOUT = 10 * 1000;
class VirtualWebSocketClient {
    constructor(options) {
        this.watchStatus = WATCH_STATUS.INITING;
        this._login = async (envId, refresh) => {
            this.watchStatus = WATCH_STATUS.LOGGINGIN;
            const loginResult = await this.login(envId, refresh);
            if (!this.envId) {
                this.envId = loginResult.envId;
            }
            return loginResult;
        };
        this.initWatch = async (forceRefreshLogin) => {
            if (this._initWatchPromise) {
                return this._initWatchPromise;
            }
            this._initWatchPromise = new Promise(async (resolve, reject) => {
                try {
                    if (this.watchStatus === WATCH_STATUS.PAUSED) {
                        console.log('[realtime] initWatch cancelled on pause');
                        return resolve();
                    }
                    const { envId } = await this._login(this.envId, forceRefreshLogin);
                    if (this.watchStatus === WATCH_STATUS.PAUSED) {
                        console.log('[realtime] initWatch cancelled on pause');
                        return resolve();
                    }
                    this.watchStatus = WATCH_STATUS.INITING;
                    const initWatchMsg = {
                        watchId: this.watchId,
                        requestId: Object(_message__WEBPACK_IMPORTED_MODULE_3__["genRequestId"])(),
                        msgType: 'INIT_WATCH',
                        msgData: {
                            envId,
                            collName: this.collectionName,
                            query: this.query
                        }
                    };
                    const initEventMsg = await this.send({
                        msg: initWatchMsg,
                        waitResponse: true,
                        skipOnMessage: true,
                        timeout: DEFAULT_INIT_WATCH_TIMEOUT
                    });
                    const { events, currEvent } = initEventMsg.msgData;
                    this.sessionInfo = {
                        queryID: initEventMsg.msgData.queryID,
                        currentEventId: currEvent - 1,
                        currentDocs: []
                    };
                    if (events.length > 0) {
                        for (const e of events) {
                            e.ID = currEvent;
                        }
                        this.handleServerEvents(initEventMsg);
                    }
                    else {
                        this.sessionInfo.currentEventId = currEvent;
                        const snapshot = new _snapshot__WEBPACK_IMPORTED_MODULE_8__["Snapshot"]({
                            id: currEvent,
                            docChanges: [],
                            docs: [],
                            type: 'init'
                        });
                        this.listener.onChange(snapshot);
                        this.scheduleSendACK();
                    }
                    this.onWatchStart(this, this.sessionInfo.queryID);
                    this.watchStatus = WATCH_STATUS.ACTIVE;
                    this._availableRetries.INIT_WATCH = DEFAULT_MAX_AUTO_RETRY_ON_ERROR;
                    resolve();
                }
                catch (e) {
                    this.handleWatchEstablishmentError(e, {
                        operationName: 'INIT_WATCH',
                        resolve,
                        reject
                    });
                }
            });
            let success = false;
            try {
                await this._initWatchPromise;
                success = true;
            }
            finally {
                this._initWatchPromise = undefined;
            }
            console.log(`[realtime] initWatch ${success ? 'success' : 'fail'}`);
        };
        this.rebuildWatch = async (forceRefreshLogin) => {
            if (this._rebuildWatchPromise) {
                return this._rebuildWatchPromise;
            }
            this._rebuildWatchPromise = new Promise(async (resolve, reject) => {
                try {
                    if (this.watchStatus === WATCH_STATUS.PAUSED) {
                        console.log('[realtime] rebuildWatch cancelled on pause');
                        return resolve();
                    }
                    const { envId } = await this._login(this.envId, forceRefreshLogin);
                    if (!this.sessionInfo) {
                        throw new Error('can not rebuildWatch without a successful initWatch (lack of sessionInfo)');
                    }
                    if (this.watchStatus === WATCH_STATUS.PAUSED) {
                        console.log('[realtime] rebuildWatch cancelled on pause');
                        return resolve();
                    }
                    this.watchStatus = WATCH_STATUS.REBUILDING;
                    const rebuildWatchMsg = {
                        watchId: this.watchId,
                        requestId: Object(_message__WEBPACK_IMPORTED_MODULE_3__["genRequestId"])(),
                        msgType: 'REBUILD_WATCH',
                        msgData: {
                            envId,
                            collName: this.collectionName,
                            queryID: this.sessionInfo.queryID,
                            eventID: this.sessionInfo.currentEventId
                        }
                    };
                    const nextEventMsg = await this.send({
                        msg: rebuildWatchMsg,
                        waitResponse: true,
                        skipOnMessage: false,
                        timeout: DEFAULT_REBUILD_WATCH_TIMEOUT
                    });
                    this.handleServerEvents(nextEventMsg);
                    this.watchStatus = WATCH_STATUS.ACTIVE;
                    this._availableRetries.REBUILD_WATCH = DEFAULT_MAX_AUTO_RETRY_ON_ERROR;
                    resolve();
                }
                catch (e) {
                    this.handleWatchEstablishmentError(e, {
                        operationName: 'REBUILD_WATCH',
                        resolve,
                        reject
                    });
                }
            });
            let success = false;
            try {
                await this._rebuildWatchPromise;
                success = true;
            }
            finally {
                this._rebuildWatchPromise = undefined;
            }
            console.log(`[realtime] rebuildWatch ${success ? 'success' : 'fail'}`);
        };
        this.handleWatchEstablishmentError = async (e, options) => {
            const isInitWatch = options.operationName === 'INIT_WATCH';
            const abortWatch = () => {
                this.closeWithError(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                    errCode: isInitWatch
                        ? _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_INIT_WATCH_FAIL
                        : _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_REBUILD_WATCH_FAIL,
                    errMsg: e
                }));
                options.reject(e);
            };
            const retry = (refreshLogin) => {
                if (this.useRetryTicket(options.operationName)) {
                    if (isInitWatch) {
                        this._initWatchPromise = undefined;
                        options.resolve(this.initWatch(refreshLogin));
                    }
                    else {
                        this._rebuildWatchPromise = undefined;
                        options.resolve(this.rebuildWatch(refreshLogin));
                    }
                }
                else {
                    abortWatch();
                }
            };
            this.handleCommonError(e, {
                onSignError: () => retry(true),
                onTimeoutError: () => retry(false),
                onNotRetryableError: abortWatch,
                onCancelledError: options.reject,
                onUnknownError: async () => {
                    try {
                        const onWSDisconnected = async () => {
                            this.pause();
                            await this.onceWSConnected();
                            retry(true);
                        };
                        if (!this.isWSConnected()) {
                            await onWSDisconnected();
                        }
                        else {
                            await Object(_utils_utils__WEBPACK_IMPORTED_MODULE_6__["sleep"])(DEFAULT_WAIT_TIME_ON_UNKNOWN_ERROR);
                            if (this.watchStatus === WATCH_STATUS.PAUSED) {
                                options.reject(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CancelledError"](`${options.operationName} cancelled due to pause after unknownError`));
                            }
                            else if (!this.isWSConnected()) {
                                await onWSDisconnected();
                            }
                            else {
                                retry(false);
                            }
                        }
                    }
                    catch (e) {
                        retry(true);
                    }
                }
            });
        };
        this.closeWatch = async () => {
            const queryId = this.sessionInfo ? this.sessionInfo.queryID : '';
            if (this.watchStatus !== WATCH_STATUS.ACTIVE) {
                this.watchStatus = WATCH_STATUS.CLOSED;
                this.onWatchClose(this, queryId);
                return;
            }
            try {
                this.watchStatus = WATCH_STATUS.CLOSING;
                const closeWatchMsg = {
                    watchId: this.watchId,
                    requestId: Object(_message__WEBPACK_IMPORTED_MODULE_3__["genRequestId"])(),
                    msgType: 'CLOSE_WATCH',
                    msgData: null
                };
                await this.send({
                    msg: closeWatchMsg
                });
                this.sessionInfo = undefined;
                this.watchStatus = WATCH_STATUS.CLOSED;
            }
            catch (e) {
                this.closeWithError(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                    errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_CLOSE_WATCH_FAIL,
                    errMsg: e
                }));
            }
            finally {
                this.onWatchClose(this, queryId);
            }
        };
        this.scheduleSendACK = () => {
            this.clearACKSchedule();
            this._ackTimeoutId = setTimeout(() => {
                if (this._waitExpectedTimeoutId) {
                    this.scheduleSendACK();
                }
                else {
                    this.sendACK();
                }
            }, DEFAULT_SEND_ACK_DEBOUNCE_TIMEOUT);
        };
        this.clearACKSchedule = () => {
            if (this._ackTimeoutId) {
                clearTimeout(this._ackTimeoutId);
            }
        };
        this.sendACK = async () => {
            try {
                if (this.watchStatus !== WATCH_STATUS.ACTIVE) {
                    this.scheduleSendACK();
                    return;
                }
                if (!this.sessionInfo) {
                    console.warn('[realtime listener] can not send ack without a successful initWatch (lack of sessionInfo)');
                    return;
                }
                const ackMsg = {
                    watchId: this.watchId,
                    requestId: Object(_message__WEBPACK_IMPORTED_MODULE_3__["genRequestId"])(),
                    msgType: 'CHECK_LAST',
                    msgData: {
                        queryID: this.sessionInfo.queryID,
                        eventID: this.sessionInfo.currentEventId
                    }
                };
                await this.send({
                    msg: ackMsg
                });
                this.scheduleSendACK();
            }
            catch (e) {
                if (Object(_error__WEBPACK_IMPORTED_MODULE_9__["isRealtimeErrorMessageError"])(e)) {
                    const msg = e.payload;
                    switch (msg.msgData.code) {
                        case 'CHECK_LOGIN_FAILED':
                        case 'SIGN_EXPIRED_ERROR':
                        case 'SIGN_INVALID_ERROR':
                        case 'SIGN_PARAM_INVALID': {
                            this.rebuildWatch();
                            return;
                        }
                        case 'QUERYID_INVALID_ERROR':
                        case 'SYS_ERR':
                        case 'INVALIID_ENV':
                        case 'COLLECTION_PERMISSION_DENIED': {
                            this.closeWithError(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                                errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL,
                                errMsg: msg.msgData.code
                            }));
                            return;
                        }
                        default: {
                            break;
                        }
                    }
                }
                if (this._availableRetries.CHECK_LAST &&
                    this._availableRetries.CHECK_LAST > 0) {
                    this._availableRetries.CHECK_LAST--;
                    this.scheduleSendACK();
                }
                else {
                    this.closeWithError(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                        errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL,
                        errMsg: e
                    }));
                }
            }
        };
        this.handleCommonError = (e, options) => {
            if (Object(_error__WEBPACK_IMPORTED_MODULE_9__["isRealtimeErrorMessageError"])(e)) {
                const msg = e.payload;
                switch (msg.msgData.code) {
                    case 'CHECK_LOGIN_FAILED':
                    case 'SIGN_EXPIRED_ERROR':
                    case 'SIGN_INVALID_ERROR':
                    case 'SIGN_PARAM_INVALID': {
                        options.onSignError(e);
                        return;
                    }
                    case 'QUERYID_INVALID_ERROR':
                    case 'SYS_ERR':
                    case 'INVALIID_ENV':
                    case 'COLLECTION_PERMISSION_DENIED': {
                        options.onNotRetryableError(e);
                        return;
                    }
                    default: {
                        options.onNotRetryableError(e);
                        return;
                    }
                }
            }
            else if (Object(_utils_error__WEBPACK_IMPORTED_MODULE_4__["isTimeoutError"])(e)) {
                options.onTimeoutError(e);
                return;
            }
            else if (Object(_utils_error__WEBPACK_IMPORTED_MODULE_4__["isCancelledError"])(e)) {
                options.onCancelledError(e);
                return;
            }
            options.onUnknownError(e);
        };
        this.watchId = `watchid_${+new Date()}_${Math.random()}`;
        this.envId = options.envId;
        this.collectionName = options.collectionName;
        this.query = options.query;
        this.send = options.send;
        this.login = options.login;
        this.isWSConnected = options.isWSConnected;
        this.onceWSConnected = options.onceWSConnected;
        this.getWaitExpectedTimeoutLength = options.getWaitExpectedTimeoutLength;
        this.onWatchStart = options.onWatchStart;
        this.onWatchClose = options.onWatchClose;
        this.debug = options.debug;
        this._availableRetries = {
            INIT_WATCH: DEFAULT_MAX_AUTO_RETRY_ON_ERROR,
            REBUILD_WATCH: DEFAULT_MAX_AUTO_RETRY_ON_ERROR,
            CHECK_LAST: DEFAULT_MAX_SEND_ACK_AUTO_RETRY_ON_ERROR
        };
        this.listener = new _listener__WEBPACK_IMPORTED_MODULE_7__["RealtimeListener"]({
            close: this.closeWatch,
            onChange: options.onChange,
            onError: options.onError,
            debug: this.debug,
            virtualClient: this
        });
        this.initWatch();
    }
    useRetryTicket(operationName) {
        if (this._availableRetries[operationName] &&
            this._availableRetries[operationName] > 0) {
            this._availableRetries[operationName]--;
            console.log(`[realtime] ${operationName} use a retry ticket, now only ${this._availableRetries[operationName]} retry left`);
            return true;
        }
        return false;
    }
    async handleServerEvents(msg) {
        try {
            this.scheduleSendACK();
            await this._handleServerEvents(msg);
            this._postHandleServerEventsValidityCheck(msg);
        }
        catch (e) {
            console.error('[realtime listener] internal non-fatal error: handle server events failed with error: ', e);
            throw e;
        }
    }
    async _handleServerEvents(msg) {
        const { requestId } = msg;
        const { events } = msg.msgData;
        const { msgType } = msg;
        if (!events.length || !this.sessionInfo) {
            return;
        }
        const sessionInfo = this.sessionInfo;
        let allChangeEvents;
        try {
            allChangeEvents = events.map(getPublicEvent);
        }
        catch (e) {
            this.closeWithError(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_RECEIVE_INVALID_SERVER_DATA,
                errMsg: e
            }));
            return;
        }
        let docs = [...sessionInfo.currentDocs];
        let initEncountered = false;
        for (let i = 0, len = allChangeEvents.length; i < len; i++) {
            const change = allChangeEvents[i];
            if (sessionInfo.currentEventId >= change.id) {
                if (!allChangeEvents[i - 1] || change.id > allChangeEvents[i - 1].id) {
                    console.warn(`[realtime] duplicate event received, cur ${sessionInfo.currentEventId} but got ${change.id}`);
                }
                else {
                    console.error(`[realtime listener] server non-fatal error: events out of order (the latter event's id is smaller than that of the former) (requestId ${requestId})`);
                }
                continue;
            }
            else if (sessionInfo.currentEventId === change.id - 1) {
                switch (change.dataType) {
                    case 'update': {
                        if (!change.doc) {
                            switch (change.queueType) {
                                case 'update':
                                case 'dequeue': {
                                    const localDoc = docs.find(doc => doc._id === change.docId);
                                    if (localDoc) {
                                        const doc = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(localDoc);
                                        if (change.updatedFields) {
                                            for (const fieldPath in change.updatedFields) {
                                                lodash_set__WEBPACK_IMPORTED_MODULE_0___default()(doc, fieldPath, change.updatedFields[fieldPath]);
                                            }
                                        }
                                        if (change.removedFields) {
                                            for (const fieldPath of change.removedFields) {
                                                lodash_unset__WEBPACK_IMPORTED_MODULE_1___default()(doc, fieldPath);
                                            }
                                        }
                                        change.doc = doc;
                                    }
                                    else {
                                        console.error('[realtime listener] internal non-fatal server error: unexpected update dataType event where no doc is associated.');
                                    }
                                    break;
                                }
                                case 'enqueue': {
                                    const err = new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                                        errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
                                        errMsg: `HandleServerEvents: full doc is not provided with dataType="update" and queueType="enqueue" (requestId ${msg.requestId})`
                                    });
                                    this.closeWithError(err);
                                    throw err;
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                        break;
                    }
                    case 'replace': {
                        if (!change.doc) {
                            const err = new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                                errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
                                errMsg: `HandleServerEvents: full doc is not provided with dataType="replace" (requestId ${msg.requestId})`
                            });
                            this.closeWithError(err);
                            throw err;
                        }
                        break;
                    }
                    case 'remove': {
                        const doc = docs.find(doc => doc._id === change.docId);
                        if (doc) {
                            change.doc = doc;
                        }
                        else {
                            console.error('[realtime listener] internal non-fatal server error: unexpected remove event where no doc is associated.');
                        }
                        break;
                    }
                }
                switch (change.queueType) {
                    case 'init': {
                        if (!initEncountered) {
                            initEncountered = true;
                            docs = [change.doc];
                        }
                        else {
                            docs.push(change.doc);
                        }
                        break;
                    }
                    case 'enqueue': {
                        docs.push(change.doc);
                        break;
                    }
                    case 'dequeue': {
                        const ind = docs.findIndex(doc => doc._id === change.docId);
                        if (ind > -1) {
                            docs.splice(ind, 1);
                        }
                        else {
                            console.error('[realtime listener] internal non-fatal server error: unexpected dequeue event where no doc is associated.');
                        }
                        break;
                    }
                    case 'update': {
                        const ind = docs.findIndex(doc => doc._id === change.docId);
                        if (ind > -1) {
                            docs[ind] = change.doc;
                        }
                        else {
                            console.error('[realtime listener] internal non-fatal server error: unexpected queueType update event where no doc is associated.');
                        }
                        break;
                    }
                }
                if (i === len - 1 ||
                    (allChangeEvents[i + 1] && allChangeEvents[i + 1].id !== change.id)) {
                    const docsSnapshot = [...docs];
                    const docChanges = allChangeEvents
                        .slice(0, i + 1)
                        .filter(c => c.id === change.id);
                    this.sessionInfo.currentEventId = change.id;
                    this.sessionInfo.currentDocs = docs;
                    const snapshot = new _snapshot__WEBPACK_IMPORTED_MODULE_8__["Snapshot"]({
                        id: change.id,
                        docChanges,
                        docs: docsSnapshot,
                        msgType
                    });
                    this.listener.onChange(snapshot);
                }
            }
            else {
                console.warn(`[realtime listener] event received is out of order, cur ${this.sessionInfo.currentEventId} but got ${change.id}`);
                await this.rebuildWatch();
                return;
            }
        }
    }
    _postHandleServerEventsValidityCheck(msg) {
        if (!this.sessionInfo) {
            console.error('[realtime listener] internal non-fatal error: sessionInfo lost after server event handling, this should never occur');
            return;
        }
        if (this.sessionInfo.expectEventId &&
            this.sessionInfo.currentEventId >= this.sessionInfo.expectEventId) {
            this.clearWaitExpectedEvent();
        }
        if (this.sessionInfo.currentEventId < msg.msgData.currEvent) {
            console.warn('[realtime listener] internal non-fatal error: client eventId does not match with server event id after server event handling');
            return;
        }
    }
    clearWaitExpectedEvent() {
        if (this._waitExpectedTimeoutId) {
            clearTimeout(this._waitExpectedTimeoutId);
            this._waitExpectedTimeoutId = undefined;
        }
    }
    onMessage(msg) {
        switch (this.watchStatus) {
            case WATCH_STATUS.PAUSED: {
                if (msg.msgType !== 'ERROR') {
                    return;
                }
                break;
            }
            case WATCH_STATUS.LOGGINGIN:
            case WATCH_STATUS.INITING:
            case WATCH_STATUS.REBUILDING: {
                console.warn(`[realtime listener] internal non-fatal error: unexpected message received while ${this.watchStatus}`);
                return;
            }
            case WATCH_STATUS.CLOSED: {
                console.warn('[realtime listener] internal non-fatal error: unexpected message received when the watch has closed');
                return;
            }
            case WATCH_STATUS.ERRORED: {
                console.warn('[realtime listener] internal non-fatal error: unexpected message received when the watch has ended with error');
                return;
            }
        }
        if (!this.sessionInfo) {
            console.warn('[realtime listener] internal non-fatal error: sessionInfo not found while message is received.');
            return;
        }
        this.scheduleSendACK();
        switch (msg.msgType) {
            case 'NEXT_EVENT': {
                console.warn(`nextevent ${msg.msgData.currEvent} ignored`, msg);
                this.handleServerEvents(msg);
                break;
            }
            case 'CHECK_EVENT': {
                if (this.sessionInfo.currentEventId < msg.msgData.currEvent) {
                    this.sessionInfo.expectEventId = msg.msgData.currEvent;
                    this.clearWaitExpectedEvent();
                    this._waitExpectedTimeoutId = setTimeout(() => {
                        this.rebuildWatch();
                    }, this.getWaitExpectedTimeoutLength());
                    console.log(`[realtime] waitExpectedTimeoutLength ${this.getWaitExpectedTimeoutLength()}`);
                }
                break;
            }
            case 'ERROR': {
                this.closeWithError(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                    errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_5__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_SERVER_ERROR_MSG,
                    errMsg: `${msg.msgData.code} - ${msg.msgData.message}`
                }));
                break;
            }
            default: {
                console.warn(`[realtime listener] virtual client receive unexpected msg ${msg.msgType}: `, msg);
                break;
            }
        }
    }
    closeWithError(error) {
        this.watchStatus = WATCH_STATUS.ERRORED;
        this.clearACKSchedule();
        this.listener.onError(error);
        this.onWatchClose(this, (this.sessionInfo && this.sessionInfo.queryID) || '');
        console.log(`[realtime] client closed (${this.collectionName} ${this.query}) (watchId ${this.watchId})`);
    }
    pause() {
        this.watchStatus = WATCH_STATUS.PAUSED;
        console.log(`[realtime] client paused (${this.collectionName} ${this.query}) (watchId ${this.watchId})`);
    }
    async resume() {
        this.watchStatus = WATCH_STATUS.RESUMING;
        console.log(`[realtime] client resuming with ${this.sessionInfo ? 'REBUILD_WATCH' : 'INIT_WATCH'} (${this.collectionName} ${this.query}) (${this.watchId})`);
        try {
            await (this.sessionInfo ? this.rebuildWatch() : this.initWatch());
            console.log(`[realtime] client successfully resumed (${this.collectionName} ${this.query}) (${this.watchId})`);
        }
        catch (e) {
            console.error(`[realtime] client resume failed (${this.collectionName} ${this.query}) (${this.watchId})`, e);
        }
    }
}
function getPublicEvent(event) {
    const e = {
        id: event.ID,
        dataType: event.DataType,
        queueType: event.QueueType,
        docId: event.DocID,
        doc: event.Doc && event.Doc !== '{}' ? JSON.parse(event.Doc) : undefined
    };
    if (event.DataType === 'update') {
        if (event.UpdatedFields) {
            e.updatedFields = JSON.parse(event.UpdatedFields);
        }
        if (event.removedFields || event.RemovedFields) {
            e.removedFields = JSON.parse(event.removedFields);
        }
    }
    return e;
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/realtime/websocket-client.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/realtime/websocket-client.js ***!
  \********************************************************************************/
/*! exports provided: RealtimeWebSocketClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RealtimeWebSocketClient", function() { return RealtimeWebSocketClient; });
/* harmony import */ var _virtual_websocket_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./virtual-websocket-client */ "./node_modules/@cloudbase/database/dist/esm/realtime/virtual-websocket-client.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./node_modules/@cloudbase/database/dist/esm/utils/utils.js");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message */ "./node_modules/@cloudbase/database/dist/esm/realtime/message.js");
/* harmony import */ var _ws_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ws-event */ "./node_modules/@cloudbase/database/dist/esm/realtime/ws-event.js");
/* harmony import */ var _utils_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/error */ "./node_modules/@cloudbase/database/dist/esm/utils/error.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error */ "./node_modules/@cloudbase/database/dist/esm/realtime/error.js");
/* harmony import */ var _config_error_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/error.config */ "./node_modules/@cloudbase/database/dist/esm/config/error.config.js");







const WS_READY_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};
const MAX_RTT_OBSERVED = 3;
const DEFAULT_EXPECTED_EVENT_WAIT_TIME = 5000;
const DEFAULT_UNTRUSTED_RTT_THRESHOLD = 10000;
const DEFAULT_MAX_RECONNECT = 5;
const DEFAULT_WS_RECONNECT_INTERVAL = 10000;
const DEFAULT_PING_FAIL_TOLERANCE = 2;
const DEFAULT_PONG_MISS_TOLERANCE = 2;
const DEFAULT_LOGIN_TIMEOUT = 5000;
class RealtimeWebSocketClient {
    constructor(options) {
        this._virtualWSClient = new Set();
        this._queryIdClientMap = new Map();
        this._watchIdClientMap = new Map();
        this._pingFailed = 0;
        this._pongMissed = 0;
        this._logins = new Map();
        this._wsReadySubsribers = [];
        this._wsResponseWait = new Map();
        this._rttObserved = [];
        this.initWebSocketConnection = async (reconnect, availableRetries = this._maxReconnect) => {
            if (reconnect && this._reconnectState) {
                return;
            }
            if (reconnect) {
                this._reconnectState = true;
            }
            if (this._wsInitPromise) {
                return this._wsInitPromise;
            }
            console.log(`[realtime] initWebSocketConnection reconnect ${reconnect} availableRetries ${availableRetries}`);
            if (reconnect) {
                this.pauseClients();
            }
            this.close(_ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].ReconnectWebSocket);
            this._wsInitPromise = new Promise(async (resolve, reject) => {
                try {
                    console.log('[realtime] initWebSocketConnection start throwErrorIfNetworkOffline');
                    console.log('[realtime] initWebSocketConnection start getSignature');
                    await this.getAccessToken();
                    console.log('[realtime] initWebSocketConnection getSignature success');
                    console.log('[realtime] initWebSocketConnection start connectSocket');
                    await new Promise(success => {
                        this._ws = new WebSocket('wss://tcb-ws.tencentcloudapi.com');
                        success();
                    });
                    console.log('[realtime] initWebSocketConnection connectSocket successfully fired');
                    await this.initWebSocketEvent();
                    resolve();
                    if (reconnect) {
                        this.resumeClients();
                        this._reconnectState = false;
                    }
                }
                catch (e) {
                    console.error('[realtime] initWebSocketConnection connect fail', e);
                    if (availableRetries > 0) {
                        const isConnected = true;
                        console.log('[realtime] initWebSocketConnection waiting for network online');
                        console.log('[realtime] initWebSocketConnection network online');
                        this._wsInitPromise = undefined;
                        if (isConnected) {
                            console.log(`[realtime] initWebSocketConnection sleep ${this._reconnectInterval}ms`);
                            await Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["sleep"])(this._reconnectInterval);
                            if (reconnect) {
                                this._reconnectState = false;
                            }
                        }
                        resolve(this.initWebSocketConnection(reconnect, availableRetries - 1));
                    }
                    else {
                        reject(e);
                        if (reconnect) {
                            this.closeAllClients(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                                errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_6__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_RECONNECT_WATCH_FAIL,
                                errMsg: e
                            }));
                        }
                    }
                }
            });
            let success = false;
            try {
                await this._wsInitPromise;
                success = true;
                this._wsReadySubsribers.forEach(({ resolve }) => resolve());
            }
            catch (e) {
                this._wsReadySubsribers.forEach(({ reject }) => reject());
            }
            finally {
                this._wsInitPromise = undefined;
                this._wsReadySubsribers = [];
            }
            console.log(`[realtime] initWebSocketConnection ${success ? 'success' : 'fail'}`);
        };
        this.initWebSocketEvent = () => new Promise((resolve, reject) => {
            if (!this._ws) {
                throw new Error('can not initWebSocketEvent, ws not exists');
            }
            let wsOpened = false;
            this._ws.onopen = event => {
                console.warn('[realtime] ws event: open', event);
                wsOpened = true;
                resolve();
            };
            this._ws.onerror = event => {
                this._logins = new Map();
                if (!wsOpened) {
                    console.error('[realtime] ws open failed with ws event: error', event);
                    reject(event);
                }
                else {
                    console.error('[realtime] ws event: error', event);
                    this.clearHeartbeat();
                    this._virtualWSClient.forEach(client => client.closeWithError(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["CloudSDKError"]({
                        errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_6__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_ERROR,
                        errMsg: event
                    })));
                }
            };
            this._ws.onclose = closeEvent => {
                console.warn('[realtime] ws event: close', closeEvent);
                this._logins = new Map();
                this.clearHeartbeat();
                switch (closeEvent.code) {
                    case _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].ReconnectWebSocket: {
                        break;
                    }
                    case _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].NoRealtimeListeners: {
                        break;
                    }
                    case _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].HeartbeatPingError:
                    case _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].HeartbeatPongTimeoutError:
                    case _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].NormalClosure:
                    case _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].AbnormalClosure: {
                        if (this._maxReconnect > 0) {
                            this.initWebSocketConnection(true, this._maxReconnect);
                        }
                        else {
                            this.closeAllClients(Object(_ws_event__WEBPACK_IMPORTED_MODULE_3__["getWSCloseError"])(closeEvent.code));
                        }
                        break;
                    }
                    case _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].NoAuthentication: {
                        this.closeAllClients(Object(_ws_event__WEBPACK_IMPORTED_MODULE_3__["getWSCloseError"])(closeEvent.code, closeEvent.reason));
                        break;
                    }
                    default: {
                        if (this._maxReconnect > 0) {
                            this.initWebSocketConnection(true, this._maxReconnect);
                        }
                        else {
                            this.closeAllClients(Object(_ws_event__WEBPACK_IMPORTED_MODULE_3__["getWSCloseError"])(closeEvent.code));
                        }
                    }
                }
            };
            this._ws.onmessage = res => {
                const rawMsg = res.data;
                this.heartbeat();
                let msg;
                try {
                    msg = JSON.parse(rawMsg);
                }
                catch (e) {
                    throw new Error(`[realtime] onMessage parse res.data error: ${e}`);
                }
                console.log(`[realtime] onMessage ${msg.msgType} (${new Date().toLocaleString()})`, msg);
                if (msg.msgType === 'ERROR') {
                    let virtualWatch = null;
                    this._virtualWSClient.forEach(item => {
                        if (item.watchId === msg.watchId) {
                            virtualWatch = item;
                        }
                    });
                    if (virtualWatch) {
                        virtualWatch.listener.onError(msg);
                    }
                }
                const responseWaitSpec = this._wsResponseWait.get(msg.requestId);
                if (responseWaitSpec) {
                    try {
                        if (msg.msgType === 'ERROR') {
                            responseWaitSpec.reject(new _error__WEBPACK_IMPORTED_MODULE_5__["RealtimeErrorMessageError"](msg));
                        }
                        else {
                            responseWaitSpec.resolve(msg);
                        }
                    }
                    catch (e) {
                        console.error('ws onMessage responseWaitSpec.resolve(msg) errored:', e);
                    }
                    finally {
                        this._wsResponseWait.delete(msg.requestId);
                    }
                    if (responseWaitSpec.skipOnMessage) {
                        return;
                    }
                }
                if (msg.msgType === 'PONG') {
                    if (this._lastPingSendTS) {
                        const rtt = Date.now() - this._lastPingSendTS;
                        if (rtt > DEFAULT_UNTRUSTED_RTT_THRESHOLD) {
                            console.warn(`[realtime] untrusted rtt observed: ${rtt}`);
                            return;
                        }
                        if (this._rttObserved.length >= MAX_RTT_OBSERVED) {
                            this._rttObserved.splice(0, this._rttObserved.length - MAX_RTT_OBSERVED + 1);
                        }
                        this._rttObserved.push(rtt);
                    }
                    return;
                }
                let client = msg.watchId && this._watchIdClientMap.get(msg.watchId);
                if (client) {
                    client.onMessage(msg);
                }
                else {
                    console.error(`[realtime] no realtime listener found responsible for watchId ${msg.watchId}: `, msg);
                    switch (msg.msgType) {
                        case 'INIT_EVENT':
                        case 'NEXT_EVENT':
                        case 'CHECK_EVENT': {
                            client = this._queryIdClientMap.get(msg.msgData.queryID);
                            if (client) {
                                client.onMessage(msg);
                            }
                            break;
                        }
                        default: {
                            for (const [watchId, client] of this._watchIdClientMap) {
                                console.log('watchid*****', watchId);
                                client.onMessage(msg);
                                break;
                            }
                        }
                    }
                }
            };
            this.heartbeat();
        });
        this.isWSConnected = () => {
            return Boolean(this._ws && this._ws.readyState === WS_READY_STATE.OPEN);
        };
        this.onceWSConnected = async () => {
            if (this.isWSConnected()) {
                return;
            }
            if (this._wsInitPromise) {
                return this._wsInitPromise;
            }
            return new Promise((resolve, reject) => {
                this._wsReadySubsribers.push({
                    resolve,
                    reject
                });
            });
        };
        this.webLogin = async (envId, refresh) => {
            if (!refresh) {
                if (envId) {
                    const loginInfo = this._logins.get(envId);
                    if (loginInfo) {
                        if (loginInfo.loggedIn && loginInfo.loginResult) {
                            console.log('[realtime] login: already logged in');
                            return loginInfo.loginResult;
                        }
                        else if (loginInfo.loggingInPromise) {
                            return loginInfo.loggingInPromise;
                        }
                    }
                }
                else {
                    const emptyEnvLoginInfo = this._logins.get('');
                    if (emptyEnvLoginInfo && emptyEnvLoginInfo.loggingInPromise) {
                        return emptyEnvLoginInfo.loggingInPromise;
                    }
                }
            }
            console.log('[realtime] login: logging in');
            const promise = new Promise(async (resolve, reject) => {
                try {
                    const accessTokenRes = await this.getAccessToken();
                    const loginMsg = {
                        watchId: undefined,
                        requestId: Object(_message__WEBPACK_IMPORTED_MODULE_2__["genRequestId"])(),
                        msgType: 'LOGIN',
                        msgData: {
                            envId: accessTokenRes.env || '',
                            accessToken: accessTokenRes.accessToken,
                            referrer: 'web',
                            sdkVersion: '',
                            dataVersion: ''
                        }
                    };
                    const loginResMsg = await this.send({
                        msg: loginMsg,
                        waitResponse: true,
                        skipOnMessage: true,
                        timeout: DEFAULT_LOGIN_TIMEOUT
                    });
                    if (!loginResMsg.msgData.code) {
                        resolve({
                            envId: accessTokenRes.env
                        });
                    }
                    else {
                        reject(new Error(`${loginResMsg.msgData.code} ${loginResMsg.msgData.message}`));
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
            let loginInfo = envId && this._logins.get(envId);
            const loginStartTS = Date.now();
            if (loginInfo) {
                loginInfo.loggedIn = false;
                loginInfo.loggingInPromise = promise;
                loginInfo.loginStartTS = loginStartTS;
            }
            else {
                loginInfo = {
                    loggedIn: false,
                    loggingInPromise: promise,
                    loginStartTS
                };
                this._logins.set(envId || '', loginInfo);
            }
            try {
                const loginResult = await promise;
                const curLoginInfo = envId && this._logins.get(envId);
                if (curLoginInfo &&
                    curLoginInfo === loginInfo &&
                    curLoginInfo.loginStartTS === loginStartTS) {
                    loginInfo.loggedIn = true;
                    loginInfo.loggingInPromise = undefined;
                    loginInfo.loginStartTS = undefined;
                    loginInfo.loginResult = loginResult;
                    return loginResult;
                }
                else if (curLoginInfo) {
                    if (curLoginInfo.loggedIn && curLoginInfo.loginResult) {
                        return curLoginInfo.loginResult;
                    }
                    else if (curLoginInfo.loggingInPromise) {
                        return curLoginInfo.loggingInPromise;
                    }
                    else {
                        throw new Error('ws unexpected login info');
                    }
                }
                else {
                    throw new Error('ws login info reset');
                }
            }
            catch (e) {
                loginInfo.loggedIn = false;
                loginInfo.loggingInPromise = undefined;
                loginInfo.loginStartTS = undefined;
                loginInfo.loginResult = undefined;
                throw e;
            }
        };
        this.getAccessToken = async () => {
            return this._context.appConfig.getAccessToken();
        };
        this.getWaitExpectedTimeoutLength = () => {
            if (!this._rttObserved.length) {
                return DEFAULT_EXPECTED_EVENT_WAIT_TIME;
            }
            return ((this._rttObserved.reduce((acc, cur) => acc + cur) /
                this._rttObserved.length) *
                1.5);
        };
        this.ping = async () => {
            const msg = {
                watchId: undefined,
                requestId: Object(_message__WEBPACK_IMPORTED_MODULE_2__["genRequestId"])(),
                msgType: 'PING',
                msgData: null
            };
            await this.send({
                msg
            });
            console.log('ping sent');
        };
        this.send = (opts) => new Promise(async (_resolve, _reject) => {
            let timeoutId;
            let _hasResolved = false;
            let _hasRejected = false;
            const resolve = (value) => {
                _hasResolved = true;
                timeoutId && clearTimeout(timeoutId);
                _resolve(value);
            };
            const reject = (error) => {
                _hasRejected = true;
                timeoutId && clearTimeout(timeoutId);
                _reject(error);
            };
            if (opts.timeout) {
                timeoutId = setTimeout(async () => {
                    if (!_hasResolved || !_hasRejected) {
                        await Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["sleep"])(0);
                        if (!_hasResolved || !_hasRejected) {
                            reject(new _utils_error__WEBPACK_IMPORTED_MODULE_4__["TimeoutError"]('wsclient.send timedout'));
                        }
                    }
                }, opts.timeout);
            }
            try {
                console.log(`[realtime] ws send ${opts.msg.msgType} (${new Date().toLocaleString()}): `, opts);
                if (this._wsInitPromise) {
                    await this._wsInitPromise;
                }
                if (!this._ws) {
                    reject(new Error('invalid state: ws connection not exists, can not send message'));
                    return;
                }
                if (this._ws.readyState !== WS_READY_STATE.OPEN) {
                    reject(new Error(`ws readyState invalid: ${this._ws.readyState}, can not send message`));
                    return;
                }
                if (opts.waitResponse) {
                    this._wsResponseWait.set(opts.msg.requestId, {
                        resolve,
                        reject,
                        skipOnMessage: opts.skipOnMessage
                    });
                }
                console.log('send msg:', opts.msg);
                try {
                    this._ws.send(JSON.stringify(opts.msg));
                    if (!opts.waitResponse) {
                        resolve();
                    }
                }
                catch (err) {
                    if (err) {
                        reject(err);
                        if (opts.waitResponse) {
                            this._wsResponseWait.delete(opts.msg.requestId);
                        }
                    }
                }
            }
            catch (e) {
                reject(e);
            }
        });
        this.closeAllClients = (error) => {
            this._virtualWSClient.forEach(client => {
                client.closeWithError(error);
            });
        };
        this.pauseClients = (clients) => {
            ;
            (clients || this._virtualWSClient).forEach(client => {
                client.pause();
            });
        };
        this.resumeClients = (clients) => {
            ;
            (clients || this._virtualWSClient).forEach(client => {
                client.resume();
            });
        };
        this.onWatchStart = (client, queryID) => {
            this._queryIdClientMap.set(queryID, client);
        };
        this.onWatchClose = (client, queryID) => {
            if (queryID) {
                this._queryIdClientMap.delete(queryID);
            }
            this._watchIdClientMap.delete(client.watchId);
            this._virtualWSClient.delete(client);
            if (!this._virtualWSClient.size) {
                this.close(_ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].NoRealtimeListeners);
            }
        };
        this._maxReconnect = options.maxReconnect || DEFAULT_MAX_RECONNECT;
        this._reconnectInterval =
            options.reconnectInterval || DEFAULT_WS_RECONNECT_INTERVAL;
        this._context = options.context;
    }
    heartbeat(immediate) {
        this.clearHeartbeat();
        this._pingTimeoutId = setTimeout(async () => {
            try {
                if (!this._ws || this._ws.readyState !== WS_READY_STATE.OPEN) {
                    return;
                }
                this._lastPingSendTS = Date.now();
                await this.ping();
                this._pingFailed = 0;
                this._pongTimeoutId = setTimeout(() => {
                    console.error('pong timed out');
                    if (this._pongMissed < DEFAULT_PONG_MISS_TOLERANCE) {
                        this._pongMissed++;
                        this.heartbeat(true);
                    }
                    else {
                        this.initWebSocketConnection(true);
                    }
                }, this._context.appConfig.realtimePongWaitTimeout);
            }
            catch (e) {
                if (this._pingFailed < DEFAULT_PING_FAIL_TOLERANCE) {
                    this._pingFailed++;
                    this.heartbeat();
                }
                else {
                    this.close(_ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE"].HeartbeatPingError);
                }
            }
        }, immediate ? 0 : this._context.appConfig.realtimePingInterval);
    }
    clearHeartbeat() {
        this._pingTimeoutId && clearTimeout(this._pingTimeoutId);
        this._pongTimeoutId && clearTimeout(this._pongTimeoutId);
    }
    close(code) {
        this.clearHeartbeat();
        if (this._ws) {
            this._ws.close(code, _ws_event__WEBPACK_IMPORTED_MODULE_3__["CLOSE_EVENT_CODE_INFO"][code].name);
            this._ws = undefined;
        }
    }
    watch(options) {
        if (!this._ws && !this._wsInitPromise) {
            this.initWebSocketConnection(false);
        }
        const virtualClient = new _virtual_websocket_client__WEBPACK_IMPORTED_MODULE_0__["VirtualWebSocketClient"](Object.assign(Object.assign({}, options), { send: this.send, login: this.webLogin, isWSConnected: this.isWSConnected, onceWSConnected: this.onceWSConnected, getWaitExpectedTimeoutLength: this.getWaitExpectedTimeoutLength, onWatchStart: this.onWatchStart, onWatchClose: this.onWatchClose, debug: true }));
        this._virtualWSClient.add(virtualClient);
        this._watchIdClientMap.set(virtualClient.watchId, virtualClient);
        return virtualClient.listener;
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/realtime/ws-event.js":
/*!************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/realtime/ws-event.js ***!
  \************************************************************************/
/*! exports provided: CLOSE_EVENT_CODE_INFO, CLOSE_EVENT_CODE, getWSCloseError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLOSE_EVENT_CODE_INFO", function() { return CLOSE_EVENT_CODE_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLOSE_EVENT_CODE", function() { return CLOSE_EVENT_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWSCloseError", function() { return getWSCloseError; });
/* harmony import */ var _utils_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/error */ "./node_modules/@cloudbase/database/dist/esm/utils/error.js");
/* harmony import */ var _config_error_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/error.config */ "./node_modules/@cloudbase/database/dist/esm/config/error.config.js");


const CLOSE_EVENT_CODE_INFO = {
    1000: {
        code: 1000,
        name: 'Normal Closure',
        description: 'Normal closure; the connection successfully completed whatever purpose for which it was created.'
    },
    1001: {
        code: 1001,
        name: 'Going Away',
        description: 'The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.'
    },
    1002: {
        code: 1002,
        name: 'Protocol Error',
        description: 'The endpoint is terminating the connection due to a protocol error.'
    },
    1003: {
        code: 1003,
        name: 'Unsupported Data',
        description: 'The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).'
    },
    1005: {
        code: 1005,
        name: 'No Status Received',
        description: 'Indicates that no status code was provided even though one was expected.'
    },
    1006: {
        code: 1006,
        name: 'Abnormal Closure',
        description: 'Used to indicate that a connection was closed abnormally (that is, with no close frame being sent) when a status code is expected.'
    },
    1007: {
        code: 1007,
        name: 'Invalid frame payload data',
        description: 'The endpoint is terminating the connection because a message was received that contained inconsistent data (e.g., non-UTF-8 data within a text message).'
    },
    1008: {
        code: 1008,
        name: 'Policy Violation',
        description: 'The endpoint is terminating the connection because it received a message that violates its policy. This is a generic status code, used when codes 1003 and 1009 are not suitable.'
    },
    1009: {
        code: 1009,
        name: 'Message too big',
        description: 'The endpoint is terminating the connection because a data frame was received that is too large.'
    },
    1010: {
        code: 1010,
        name: 'Missing Extension',
        description: "The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn't."
    },
    1011: {
        code: 1011,
        name: 'Internal Error',
        description: 'The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.'
    },
    1012: {
        code: 1012,
        name: 'Service Restart',
        description: 'The server is terminating the connection because it is restarting.'
    },
    1013: {
        code: 1013,
        name: 'Try Again Later',
        description: 'The server is terminating the connection due to a temporary condition, e.g. it is overloaded and is casting off some of its clients.'
    },
    1014: {
        code: 1014,
        name: 'Bad Gateway',
        description: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server. This is similar to 502 HTTP Status Code.'
    },
    1015: {
        code: 1015,
        name: 'TLS Handshake',
        description: "Indicates that the connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified)."
    },
    3000: {
        code: 3000,
        name: 'Reconnect WebSocket',
        description: 'The client is terminating the connection because it wants to reconnect'
    },
    3001: {
        code: 3001,
        name: 'No Realtime Listeners',
        description: 'The client is terminating the connection because no more realtime listeners exist'
    },
    3002: {
        code: 3002,
        name: 'Heartbeat Ping Error',
        description: 'The client is terminating the connection due to its failure in sending heartbeat messages'
    },
    3003: {
        code: 3003,
        name: 'Heartbeat Pong Timeout Error',
        description: 'The client is terminating the connection because no heartbeat response is received from the server'
    },
    3050: {
        code: 3050,
        name: 'Server Close',
        description: 'The client is terminating the connection because no heartbeat response is received from the server'
    }
};
var CLOSE_EVENT_CODE;
(function (CLOSE_EVENT_CODE) {
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NormalClosure"] = 1000] = "NormalClosure";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["GoingAway"] = 1001] = "GoingAway";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["ProtocolError"] = 1002] = "ProtocolError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["UnsupportedData"] = 1003] = "UnsupportedData";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NoStatusReceived"] = 1005] = "NoStatusReceived";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["AbnormalClosure"] = 1006] = "AbnormalClosure";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["InvalidFramePayloadData"] = 1007] = "InvalidFramePayloadData";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["PolicyViolation"] = 1008] = "PolicyViolation";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["MessageTooBig"] = 1009] = "MessageTooBig";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["MissingExtension"] = 1010] = "MissingExtension";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["InternalError"] = 1011] = "InternalError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["ServiceRestart"] = 1012] = "ServiceRestart";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["TryAgainLater"] = 1013] = "TryAgainLater";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["BadGateway"] = 1014] = "BadGateway";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["TLSHandshake"] = 1015] = "TLSHandshake";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["ReconnectWebSocket"] = 3000] = "ReconnectWebSocket";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NoRealtimeListeners"] = 3001] = "NoRealtimeListeners";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["HeartbeatPingError"] = 3002] = "HeartbeatPingError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["HeartbeatPongTimeoutError"] = 3003] = "HeartbeatPongTimeoutError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NoAuthentication"] = 3050] = "NoAuthentication";
})(CLOSE_EVENT_CODE || (CLOSE_EVENT_CODE = {}));
const getWSCloseError = (code, reason) => {
    const info = CLOSE_EVENT_CODE_INFO[code];
    const errMsg = !info
        ? `code ${code}`
        : `${info.name}, code ${code}, reason ${reason || info.description}`;
    return new _utils_error__WEBPACK_IMPORTED_MODULE_0__["CloudSDKError"]({
        errCode: _config_error_config__WEBPACK_IMPORTED_MODULE_1__["ERR_CODE"].SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_CLOSED,
        errMsg
    });
};


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/regexp/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/regexp/index.js ***!
  \*******************************************************************/
/*! exports provided: RegExp, RegExpConstructor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegExp", function() { return RegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegExpConstructor", function() { return RegExpConstructor; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");

class RegExp {
    constructor({ regexp, options }) {
        if (!regexp) {
            throw new TypeError('regexp must be a string');
        }
        this.$regex = regexp;
        this.$options = options;
    }
    parse() {
        return {
            $regex: this.$regex,
            $options: this.$options
        };
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_REGEXP"];
    }
}
function RegExpConstructor(param) {
    return new RegExp(param);
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/serializer/common.js":
/*!************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/serializer/common.js ***!
  \************************************************************************/
/*! exports provided: flattenQueryObject, flattenObject, mergeConditionAfterEncode, isConversionRequired, encodeInternalDataType, decodeInternalDataType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenQueryObject", function() { return flattenQueryObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenObject", function() { return flattenObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeConditionAfterEncode", function() { return mergeConditionAfterEncode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConversionRequired", function() { return isConversionRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeInternalDataType", function() { return encodeInternalDataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeInternalDataType", function() { return decodeInternalDataType; });
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _datatype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datatype */ "./node_modules/@cloudbase/database/dist/esm/serializer/datatype.js");


function flatten(query, shouldPreserverObject, parents, visited) {
    const cloned = Object.assign({}, query);
    for (const key in query) {
        if (/^\$/.test(key))
            continue;
        const value = query[key];
        if (!value)
            continue;
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(value) && !shouldPreserverObject(value)) {
            if (visited.indexOf(value) > -1) {
                throw new Error('Cannot convert circular structure to JSON');
            }
            const newParents = [
                ...parents,
                key,
            ];
            const newVisited = [
                ...visited,
                value,
            ];
            const flattenedChild = flatten(value, shouldPreserverObject, newParents, newVisited);
            cloned[key] = flattenedChild;
            let hasKeyNotCombined = false;
            for (const childKey in flattenedChild) {
                if (!/^\$/.test(childKey)) {
                    cloned[`${key}.${childKey}`] = flattenedChild[childKey];
                    delete cloned[key][childKey];
                }
                else {
                    hasKeyNotCombined = true;
                }
            }
            if (!hasKeyNotCombined) {
                delete cloned[key];
            }
        }
    }
    return cloned;
}
function flattenQueryObject(query) {
    return flatten(query, isConversionRequired, [], [query]);
}
function flattenObject(object) {
    return flatten(object, (_) => false, [], [object]);
}
function mergeConditionAfterEncode(query, condition, key) {
    if (!condition[key]) {
        delete query[key];
    }
    for (const conditionKey in condition) {
        if (query[conditionKey]) {
            if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isArray"])(query[conditionKey])) {
                query[conditionKey].push(condition[conditionKey]);
            }
            else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(query[conditionKey])) {
                if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(condition[conditionKey])) {
                    Object.assign(query[conditionKey], condition[conditionKey]);
                }
                else {
                    console.warn(`unmergable condition, query is object but condition is ${Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["getType"])(condition)}, can only overwrite`, condition, key);
                    query[conditionKey] = condition[conditionKey];
                }
            }
            else {
                console.warn(`to-merge query is of type ${Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["getType"])(query)}, can only overwrite`, query, condition, key);
                query[conditionKey] = condition[conditionKey];
            }
        }
        else {
            query[conditionKey] = condition[conditionKey];
        }
    }
}
function isConversionRequired(val) {
    return Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isInternalObject"])(val) || Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDate"])(val) || Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isRegExp"])(val);
}
function encodeInternalDataType(val) {
    return Object(_datatype__WEBPACK_IMPORTED_MODULE_1__["serialize"])(val);
}
function decodeInternalDataType(object) {
    return Object(_datatype__WEBPACK_IMPORTED_MODULE_1__["deserialize"])(object);
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/serializer/datatype.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/serializer/datatype.js ***!
  \**************************************************************************/
/*! exports provided: serialize, deserialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return serialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserialize", function() { return deserialize; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _geo_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geo/index */ "./node_modules/@cloudbase/database/dist/esm/geo/index.js");
/* harmony import */ var _serverDate_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../serverDate/index */ "./node_modules/@cloudbase/database/dist/esm/serverDate/index.js");




function serialize(val) {
    return serializeHelper(val, [val]);
}
function serializeHelper(val, visited) {
    if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isInternalObject"])(val)) {
        switch (val._internalType) {
            case _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_GEO_POINT"]: {
                return val.toJSON();
            }
            case _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_SERVER_DATE"]: {
                return val.parse();
            }
            case _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_REGEXP"]: {
                return val.parse();
            }
            default: {
                return val.toJSON ? val.toJSON() : val;
            }
        }
    }
    else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDate"])(val)) {
        return {
            $date: +val,
        };
    }
    else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isRegExp"])(val)) {
        return {
            $regex: val.source,
            $options: val.flags,
        };
    }
    else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(val)) {
        return val.map(item => {
            if (visited.indexOf(item) > -1) {
                throw new Error('Cannot convert circular structure to JSON');
            }
            return serializeHelper(item, [
                ...visited,
                item,
            ]);
        });
    }
    else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(val)) {
        const ret = Object.assign({}, val);
        for (const key in ret) {
            if (visited.indexOf(ret[key]) > -1) {
                throw new Error('Cannot convert circular structure to JSON');
            }
            ret[key] = serializeHelper(ret[key], [
                ...visited,
                ret[key],
            ]);
        }
        return ret;
    }
    else {
        return val;
    }
}
function deserialize(object) {
    const ret = Object.assign({}, object);
    for (const key in ret) {
        switch (key) {
            case '$date': {
                switch (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["getType"])(ret[key])) {
                    case 'number': {
                        return new Date(ret[key]);
                    }
                    case 'object': {
                        return new _serverDate_index__WEBPACK_IMPORTED_MODULE_3__["ServerDate"](ret[key]);
                    }
                }
                break;
            }
            case 'type': {
                switch (ret.type) {
                    case 'Point': {
                        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(ret.coordinates) && Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(ret.coordinates[0]) && Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(ret.coordinates[1])) {
                            return new _geo_index__WEBPACK_IMPORTED_MODULE_2__["Point"](ret.coordinates[0], ret.coordinates[1]);
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
    return object;
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/serializer/query.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/serializer/query.js ***!
  \***********************************************************************/
/*! exports provided: QuerySerializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuerySerializer", function() { return QuerySerializer; });
/* harmony import */ var _commands_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commands/query */ "./node_modules/@cloudbase/database/dist/esm/commands/query.js");
/* harmony import */ var _commands_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commands/logic */ "./node_modules/@cloudbase/database/dist/esm/commands/logic.js");
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _operator_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operator-map */ "./node_modules/@cloudbase/database/dist/esm/operator-map.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common */ "./node_modules/@cloudbase/database/dist/esm/serializer/common.js");






class QuerySerializer {
    constructor() {
    }
    static encode(query) {
        const encoder = new QueryEncoder();
        return encoder.encodeQuery(query);
    }
}
class QueryEncoder {
    encodeQuery(query, key) {
        if (Object(_common__WEBPACK_IMPORTED_MODULE_5__["isConversionRequired"])(query)) {
            if (Object(_commands_logic__WEBPACK_IMPORTED_MODULE_1__["isLogicCommand"])(query)) {
                return this.encodeLogicCommand(query);
            }
            else if (Object(_commands_query__WEBPACK_IMPORTED_MODULE_0__["isQueryCommand"])(query)) {
                return this.encodeQueryCommand(query);
            }
            else {
                return { [key]: this.encodeQueryObject(query) };
            }
        }
        else {
            if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isObject"])(query)) {
                return this.encodeQueryObject(query);
            }
            else {
                return query;
            }
        }
    }
    encodeRegExp(query) {
        return {
            $regex: query.source,
            $options: query.flags,
        };
    }
    encodeLogicCommand(query) {
        switch (query.operator) {
            case _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].NOR:
            case _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].AND:
            case _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].OR: {
                const $op = Object(_operator_map__WEBPACK_IMPORTED_MODULE_4__["operatorToString"])(query.operator);
                const subqueries = query.operands.map((oprand) => this.encodeQuery(oprand, query.fieldName));
                return {
                    [$op]: subqueries,
                };
            }
            case _commands_logic__WEBPACK_IMPORTED_MODULE_1__["LOGIC_COMMANDS_LITERAL"].NOT: {
                console.log(query);
                const $op = Object(_operator_map__WEBPACK_IMPORTED_MODULE_4__["operatorToString"])(query.operator);
                const operatorExpression = query.operands[0];
                if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isRegExp"])(operatorExpression)) {
                    return {
                        [query.fieldName]: {
                            [$op]: this.encodeRegExp(operatorExpression),
                        }
                    };
                }
                else {
                    const subqueries = this.encodeQuery(operatorExpression)[query.fieldName];
                    return {
                        [query.fieldName]: {
                            [$op]: subqueries,
                        }
                    };
                }
            }
            default: {
                const $op = Object(_operator_map__WEBPACK_IMPORTED_MODULE_4__["operatorToString"])(query.operator);
                if (query.operands.length === 1) {
                    const subquery = this.encodeQuery(query.operands[0]);
                    return {
                        [$op]: subquery,
                    };
                }
                else {
                    const subqueries = query.operands.map(this.encodeQuery.bind(this));
                    return {
                        [$op]: subqueries,
                    };
                }
            }
        }
    }
    encodeQueryCommand(query) {
        if (Object(_commands_query__WEBPACK_IMPORTED_MODULE_0__["isComparisonCommand"])(query)) {
            return this.encodeComparisonCommand(query);
        }
        else {
            return this.encodeComparisonCommand(query);
        }
    }
    encodeComparisonCommand(query) {
        if (query.fieldName === _helper_symbol__WEBPACK_IMPORTED_MODULE_2__["SYMBOL_UNSET_FIELD_NAME"]) {
            throw new Error('Cannot encode a comparison command with unset field name');
        }
        const $op = Object(_operator_map__WEBPACK_IMPORTED_MODULE_4__["operatorToString"])(query.operator);
        switch (query.operator) {
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].EQ:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].NEQ:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].LT:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].LTE:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GT:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GTE:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].ELEM_MATCH:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].EXISTS:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].SIZE:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].MOD: {
                return {
                    [query.fieldName]: {
                        [$op]: Object(_common__WEBPACK_IMPORTED_MODULE_5__["encodeInternalDataType"])(query.operands[0]),
                    },
                };
            }
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].IN:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].NIN:
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].ALL: {
                return {
                    [query.fieldName]: {
                        [$op]: Object(_common__WEBPACK_IMPORTED_MODULE_5__["encodeInternalDataType"])(query.operands),
                    },
                };
            }
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GEO_NEAR: {
                const options = query.operands[0];
                return {
                    [query.fieldName]: {
                        $nearSphere: {
                            $geometry: options.geometry.toJSON(),
                            $maxDistance: options.maxDistance,
                            $minDistance: options.minDistance
                        }
                    }
                };
            }
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GEO_WITHIN: {
                const options = query.operands[0];
                return {
                    [query.fieldName]: {
                        $geoWithin: {
                            $geometry: options.geometry.toJSON()
                        }
                    }
                };
            }
            case _commands_query__WEBPACK_IMPORTED_MODULE_0__["QUERY_COMMANDS_LITERAL"].GEO_INTERSECTS: {
                const options = query.operands[0];
                return {
                    [query.fieldName]: {
                        $geoIntersects: {
                            $geometry: options.geometry.toJSON()
                        }
                    }
                };
            }
            default: {
                return {
                    [query.fieldName]: {
                        [$op]: Object(_common__WEBPACK_IMPORTED_MODULE_5__["encodeInternalDataType"])(query.operands[0]),
                    },
                };
            }
        }
    }
    encodeQueryObject(query) {
        const flattened = Object(_common__WEBPACK_IMPORTED_MODULE_5__["flattenQueryObject"])(query);
        for (const key in flattened) {
            const val = flattened[key];
            if (Object(_commands_logic__WEBPACK_IMPORTED_MODULE_1__["isLogicCommand"])(val)) {
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeLogicCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if (Object(_commands_query__WEBPACK_IMPORTED_MODULE_0__["isComparisonCommand"])(val)) {
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeComparisonCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if (Object(_common__WEBPACK_IMPORTED_MODULE_5__["isConversionRequired"])(val)) {
                flattened[key] = Object(_common__WEBPACK_IMPORTED_MODULE_5__["encodeInternalDataType"])(val);
            }
        }
        return flattened;
    }
    mergeConditionAfterEncode(query, condition, key) {
        if (!condition[key]) {
            delete query[key];
        }
        for (const conditionKey in condition) {
            if (query[conditionKey]) {
                if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(query[conditionKey])) {
                    query[conditionKey] = query[conditionKey].concat(condition[conditionKey]);
                }
                else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isObject"])(query[conditionKey])) {
                    if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["isObject"])(condition[conditionKey])) {
                        Object.assign(query, condition);
                    }
                    else {
                        console.warn(`unmergable condition, query is object but condition is ${Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["getType"])(condition)}, can only overwrite`, condition, key);
                        query[conditionKey] = condition[conditionKey];
                    }
                }
                else {
                    console.warn(`to-merge query is of type ${Object(_utils_type__WEBPACK_IMPORTED_MODULE_3__["getType"])(query)}, can only overwrite`, query, condition, key);
                    query[conditionKey] = condition[conditionKey];
                }
            }
            else {
                query[conditionKey] = condition[conditionKey];
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/serializer/update.js":
/*!************************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/serializer/update.js ***!
  \************************************************************************/
/*! exports provided: UpdateSerializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateSerializer", function() { return UpdateSerializer; });
/* harmony import */ var _commands_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commands/update */ "./node_modules/@cloudbase/database/dist/esm/commands/update.js");
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _operator_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../operator-map */ "./node_modules/@cloudbase/database/dist/esm/operator-map.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./node_modules/@cloudbase/database/dist/esm/serializer/common.js");





class UpdateSerializer {
    constructor() {
    }
    static encode(query) {
        const stringifier = new UpdateSerializer();
        return stringifier.encodeUpdate(query);
    }
    encodeUpdate(query) {
        if (Object(_commands_update__WEBPACK_IMPORTED_MODULE_0__["isUpdateCommand"])(query)) {
            return this.encodeUpdateCommand(query);
        }
        else if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["getType"])(query) === 'object') {
            return this.encodeUpdateObject(query);
        }
        else {
            return query;
        }
    }
    encodeUpdateCommand(query) {
        if (query.fieldName === _helper_symbol__WEBPACK_IMPORTED_MODULE_1__["SYMBOL_UNSET_FIELD_NAME"]) {
            throw new Error('Cannot encode a comparison command with unset field name');
        }
        switch (query.operator) {
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].PUSH:
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].PULL:
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].PULL_ALL:
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].POP:
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].SHIFT:
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].UNSHIFT:
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].ADD_TO_SET: {
                return this.encodeArrayUpdateCommand(query);
            }
            default: {
                return this.encodeFieldUpdateCommand(query);
            }
        }
    }
    encodeFieldUpdateCommand(query) {
        const $op = Object(_operator_map__WEBPACK_IMPORTED_MODULE_3__["operatorToString"])(query.operator);
        switch (query.operator) {
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].REMOVE: {
                return {
                    [$op]: {
                        [query.fieldName]: '',
                    },
                };
            }
            default: {
                return {
                    [$op]: {
                        [query.fieldName]: query.operands[0],
                    },
                };
            }
        }
    }
    encodeArrayUpdateCommand(query) {
        const $op = Object(_operator_map__WEBPACK_IMPORTED_MODULE_3__["operatorToString"])(query.operator);
        switch (query.operator) {
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].PUSH: {
                let modifiers;
                if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_2__["isArray"])(query.operands)) {
                    modifiers = {
                        $each: query.operands.map(_common__WEBPACK_IMPORTED_MODULE_4__["encodeInternalDataType"])
                    };
                }
                else {
                    modifiers = query.operands;
                }
                return {
                    [$op]: {
                        [query.fieldName]: modifiers,
                    },
                };
            }
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].UNSHIFT: {
                const modifiers = {
                    $each: query.operands.map(_common__WEBPACK_IMPORTED_MODULE_4__["encodeInternalDataType"]),
                    $position: 0,
                };
                return {
                    [$op]: {
                        [query.fieldName]: modifiers,
                    },
                };
            }
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].POP: {
                return {
                    [$op]: {
                        [query.fieldName]: 1,
                    },
                };
            }
            case _commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].SHIFT: {
                return {
                    [$op]: {
                        [query.fieldName]: -1,
                    },
                };
            }
            default: {
                return {
                    [$op]: {
                        [query.fieldName]: Object(_common__WEBPACK_IMPORTED_MODULE_4__["encodeInternalDataType"])(query.operands),
                    },
                };
            }
        }
    }
    encodeUpdateObject(query) {
        const flattened = Object(_common__WEBPACK_IMPORTED_MODULE_4__["flattenQueryObject"])(query);
        for (const key in flattened) {
            if (/^\$/.test(key))
                continue;
            let val = flattened[key];
            if (Object(_commands_update__WEBPACK_IMPORTED_MODULE_0__["isUpdateCommand"])(val)) {
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeUpdateCommand(flattened[key]);
                Object(_common__WEBPACK_IMPORTED_MODULE_4__["mergeConditionAfterEncode"])(flattened, condition, key);
            }
            else {
                flattened[key] = val = Object(_common__WEBPACK_IMPORTED_MODULE_4__["encodeInternalDataType"])(val);
                const $setCommand = new _commands_update__WEBPACK_IMPORTED_MODULE_0__["UpdateCommand"](_commands_update__WEBPACK_IMPORTED_MODULE_0__["UPDATE_COMMANDS_LITERAL"].SET, [val], key);
                const condition = this.encodeUpdateCommand($setCommand);
                Object(_common__WEBPACK_IMPORTED_MODULE_4__["mergeConditionAfterEncode"])(flattened, condition, key);
            }
        }
        return flattened;
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/serverDate/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/serverDate/index.js ***!
  \***********************************************************************/
/*! exports provided: ServerDate, ServerDateConstructor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerDate", function() { return ServerDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerDateConstructor", function() { return ServerDateConstructor; });
/* harmony import */ var _helper_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/symbol */ "./node_modules/@cloudbase/database/dist/esm/helper/symbol.js");

class ServerDate {
    constructor({ offset = 0 } = {}) {
        this.offset = offset;
    }
    get _internalType() {
        return _helper_symbol__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_SERVER_DATE"];
    }
    parse() {
        return {
            $date: {
                offset: this.offset
            }
        };
    }
}
function ServerDateConstructor(opt) {
    return new ServerDate(opt);
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/transaction.js":
/*!******************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/transaction.js ***!
  \******************************************************************/
/*! exports provided: Transaction, startTransaction, runTransaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transaction", function() { return Transaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTransaction", function() { return startTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runTransaction", function() { return runTransaction; });
/* harmony import */ var bson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bson */ "./node_modules/bson/dist/bson.browser.esm.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./node_modules/@cloudbase/database/dist/esm/index.js");


class DocumentSnapshot {
    constructor(data, requestId) {
        this._data = data;
        this.requestId = requestId;
    }
    data() {
        return this._data;
    }
}
const START = 'database.startTransaction';
const COMMIT = 'database.commitTransaction';
const ABORT = 'database.abortTransaction';
const GET_DOC = 'database.getInTransaction';
const UPDATE_DOC = 'database.updateDocInTransaction';
const DELETE_DOC = 'database.deleteDocInTransaction';
class Transaction {
    constructor(db) {
        this._db = db;
        this._request = new _index__WEBPACK_IMPORTED_MODULE_1__["Db"].reqClass(this._db.config);
    }
    async init() {
        const res = await this._request.send(START);
        if (res.code) {
            throw res;
        }
        this._id = res.transactionId;
    }
    async get(documentRef) {
        const param = {
            collectionName: documentRef._coll,
            transactionId: this._id,
            _id: documentRef.id
        };
        const res = await this._request.send(GET_DOC, param);
        if (res.code)
            throw res;
        return new DocumentSnapshot(bson__WEBPACK_IMPORTED_MODULE_0__["EJSON"].parse(res.data), res.requestId);
    }
    async set(documentRef, data) {
        const param = {
            collectionName: documentRef._coll,
            transactionId: this._id,
            _id: documentRef.id,
            data: bson__WEBPACK_IMPORTED_MODULE_0__["EJSON"].stringify(data, { relaxed: false }),
            upsert: true
        };
        const res = await this._request.send(UPDATE_DOC, param);
        if (res.code)
            throw res;
        return Object.assign(Object.assign({}, res), { updated: bson__WEBPACK_IMPORTED_MODULE_0__["EJSON"].parse(res.updated), upserted: res.upserted
                ? JSON.parse(res.upserted)
                : null });
    }
    async update(documentRef, data) {
        const param = {
            collectionName: documentRef._coll,
            transactionId: this._id,
            _id: documentRef.id,
            data: bson__WEBPACK_IMPORTED_MODULE_0__["EJSON"].stringify({
                $set: data
            }, {
                relaxed: false
            })
        };
        const res = await this._request.send(UPDATE_DOC, param);
        if (res.code)
            throw res;
        return Object.assign(Object.assign({}, res), { updated: bson__WEBPACK_IMPORTED_MODULE_0__["EJSON"].parse(res.updated) });
    }
    async delete(documentRef) {
        const param = {
            collectionName: documentRef._coll,
            transactionId: this._id,
            _id: documentRef.id
        };
        const res = await this._request.send(DELETE_DOC, param);
        if (res.code)
            throw res;
        return Object.assign(Object.assign({}, res), { deleted: bson__WEBPACK_IMPORTED_MODULE_0__["EJSON"].parse(res.deleted) });
    }
    async commit() {
        const param = {
            transactionId: this._id
        };
        const res = await this._request.send(COMMIT, param);
        if (res.code)
            throw res;
        return res;
    }
    async rollback() {
        const param = {
            transactionId: this._id
        };
        const res = await this._request.send(ABORT, param);
        if (res.code)
            throw res;
        return res;
    }
}
async function startTransaction() {
    const transaction = new Transaction(this);
    await transaction.init();
    return transaction;
}
async function runTransaction(callback, times = 3) {
    if (times <= 0) {
        throw new Error('Transaction failed');
    }
    try {
        const transaction = new Transaction(this);
        await transaction.init();
        await callback(transaction);
        await transaction.commit();
    }
    catch (error) {
        console.log(error);
        return runTransaction.bind(this)(callback, --times);
    }
}


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/util.js":
/*!***********************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/util.js ***!
  \***********************************************************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/@cloudbase/database/dist/esm/constant.js");
/* harmony import */ var _geo_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./geo/index */ "./node_modules/@cloudbase/database/dist/esm/geo/index.js");
/* harmony import */ var _serverDate_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serverDate/index */ "./node_modules/@cloudbase/database/dist/esm/serverDate/index.js");



class Util {
}
Util.formatResDocumentData = (documents) => {
    return documents.map(document => {
        return Util.formatField(document);
    });
};
Util.formatField = document => {
    const keys = Object.keys(document);
    let protoField = {};
    if (Array.isArray(document)) {
        protoField = [];
    }
    keys.forEach(key => {
        const item = document[key];
        const type = Util.whichType(item);
        let realValue;
        switch (type) {
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoPoint:
                realValue = new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"](item.coordinates[0], item.coordinates[1]);
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoLineString:
                realValue = new _geo_index__WEBPACK_IMPORTED_MODULE_1__["LineString"](item.coordinates.map(point => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"](point[0], point[1])));
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoPolygon:
                realValue = new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Polygon"](item.coordinates.map(line => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["LineString"](line.map(([lng, lat]) => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"](lng, lat)))));
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoMultiPoint:
                realValue = new _geo_index__WEBPACK_IMPORTED_MODULE_1__["MultiPoint"](item.coordinates.map(point => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"](point[0], point[1])));
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoMultiLineString:
                realValue = new _geo_index__WEBPACK_IMPORTED_MODULE_1__["MultiLineString"](item.coordinates.map(line => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["LineString"](line.map(([lng, lat]) => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"](lng, lat)))));
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoMultiPolygon:
                realValue = new _geo_index__WEBPACK_IMPORTED_MODULE_1__["MultiPolygon"](item.coordinates.map(polygon => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Polygon"](polygon.map(line => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["LineString"](line.map(([lng, lat]) => new _geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"](lng, lat)))))));
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Timestamp:
                realValue = new Date(item.$timestamp * 1000);
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Object:
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Array:
                realValue = Util.formatField(item);
                break;
            case _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].ServerDate:
                realValue = new Date(item.$date);
                break;
            default:
                realValue = item;
        }
        if (Array.isArray(protoField)) {
            protoField.push(realValue);
        }
        else {
            protoField[key] = realValue;
        }
    });
    return protoField;
};
Util.whichType = (obj) => {
    let type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Object) {
        if (obj instanceof _geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"]) {
            return _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoPoint;
        }
        else if (obj instanceof Date) {
            return _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Timestamp;
        }
        else if (obj instanceof _serverDate_index__WEBPACK_IMPORTED_MODULE_2__["ServerDate"]) {
            return _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].ServerDate;
        }
        if (obj.$timestamp) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Timestamp;
        }
        else if (obj.$date) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].ServerDate;
        }
        else if (_geo_index__WEBPACK_IMPORTED_MODULE_1__["Point"].validate(obj)) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoPoint;
        }
        else if (_geo_index__WEBPACK_IMPORTED_MODULE_1__["LineString"].validate(obj)) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoLineString;
        }
        else if (_geo_index__WEBPACK_IMPORTED_MODULE_1__["Polygon"].validate(obj)) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoPolygon;
        }
        else if (_geo_index__WEBPACK_IMPORTED_MODULE_1__["MultiPoint"].validate(obj)) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoMultiPoint;
        }
        else if (_geo_index__WEBPACK_IMPORTED_MODULE_1__["MultiLineString"].validate(obj)) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoMultiLineString;
        }
        else if (_geo_index__WEBPACK_IMPORTED_MODULE_1__["MultiPolygon"].validate(obj)) {
            type = _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].GeoMultiPolygon;
        }
    }
    return type;
};
Util.generateDocId = () => {
    let chars = 'ABCDEFabcdef0123456789';
    let autoId = '';
    for (let i = 0; i < 24; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
};


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/utils/error.js":
/*!******************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/utils/error.js ***!
  \******************************************************************/
/*! exports provided: CloudSDKError, isSDKError, isGenericError, TimeoutError, isTimeoutError, CancelledError, isCancelledError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudSDKError", function() { return CloudSDKError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSDKError", function() { return isSDKError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGenericError", function() { return isGenericError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return TimeoutError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTimeoutError", function() { return isTimeoutError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelledError", function() { return CancelledError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCancelledError", function() { return isCancelledError; });
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type */ "./node_modules/@cloudbase/database/dist/esm/utils/type.js");
/* harmony import */ var _config_error_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/error.config */ "./node_modules/@cloudbase/database/dist/esm/config/error.config.js");


class CloudSDKError extends Error {
    constructor(options) {
        super(options.errMsg);
        this.errCode = 'UNKNOWN_ERROR';
        Object.defineProperties(this, {
            message: {
                get() {
                    return (`errCode: ${this.errCode} ${_config_error_config__WEBPACK_IMPORTED_MODULE_1__["ERR_CODE"][this.errCode] ||
                        ''} | errMsg: ` + this.errMsg);
                },
                set(msg) {
                    this.errMsg = msg;
                }
            }
        });
        this.errCode = options.errCode || 'UNKNOWN_ERROR';
        this.errMsg = options.errMsg;
    }
    get message() {
        return `errCode: ${this.errCode} | errMsg: ` + this.errMsg;
    }
    set message(msg) {
        this.errMsg = msg;
    }
}
function isSDKError(error) {
    return (error && error instanceof Error && Object(_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(error.errMsg));
}
const isGenericError = (e) => e.generic;
class TimeoutError extends Error {
    constructor(message) {
        super(message);
        this.type = 'timeout';
        this.payload = null;
        this.generic = true;
    }
}
const isTimeoutError = (e) => e.type === 'timeout';
class CancelledError extends Error {
    constructor(message) {
        super(message);
        this.type = 'cancelled';
        this.payload = null;
        this.generic = true;
    }
}
const isCancelledError = (e) => e.type === 'cancelled';


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/utils/symbol.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/utils/symbol.js ***!
  \*******************************************************************/
/*! exports provided: InternalSymbol, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InternalSymbol", function() { return InternalSymbol; });
const _symbols = [];
const __internalMark__ = {};
class HiddenSymbol {
    constructor(target) {
        Object.defineProperties(this, {
            target: {
                enumerable: false,
                writable: false,
                configurable: false,
                value: target,
            },
        });
    }
}
class InternalSymbol extends HiddenSymbol {
    constructor(target, __mark__) {
        if (__mark__ !== __internalMark__) {
            throw new TypeError('InternalSymbol cannot be constructed with new operator');
        }
        super(target);
    }
    static for(target) {
        for (let i = 0, len = _symbols.length; i < len; i++) {
            if (_symbols[i].target === target) {
                return _symbols[i].instance;
            }
        }
        const symbol = new InternalSymbol(target, __internalMark__);
        _symbols.push({
            target,
            instance: symbol,
        });
        return symbol;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (InternalSymbol);


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/utils/type.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/utils/type.js ***!
  \*****************************************************************/
/*! exports provided: getType, isObject, isString, isNumber, isPromise, isFunction, isArray, isDate, isRegExp, isInternalObject, isPlainObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getType", function() { return getType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return isDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRegExp", function() { return isRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInternalObject", function() { return isInternalObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony import */ var _symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./symbol */ "./node_modules/@cloudbase/database/dist/esm/utils/symbol.js");

const getType = (x) => Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
const isObject = (x) => getType(x) === 'object';
const isString = (x) => getType(x) === 'string';
const isNumber = (x) => getType(x) === 'number';
const isPromise = (x) => getType(x) === 'promise';
const isFunction = (x) => typeof x === 'function';
const isArray = (x) => Array.isArray(x);
const isDate = (x) => getType(x) === 'date';
const isRegExp = (x) => getType(x) === 'regexp';
const isInternalObject = (x) => x && (x._internalType instanceof _symbol__WEBPACK_IMPORTED_MODULE_0__["InternalSymbol"]);
const isPlainObject = (obj) => {
    if (typeof obj !== 'object' || obj === null)
        return false;
    let proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
};


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/utils/utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/utils/utils.js ***!
  \******************************************************************/
/*! exports provided: sleep, autoCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoCount", function() { return autoCount; });
const sleep = (ms = 0) => new Promise(r => setTimeout(r, ms));
const counters = {};
const autoCount = (domain = 'any') => {
    if (!counters[domain]) {
        counters[domain] = 0;
    }
    return counters[domain]++;
};


/***/ }),

/***/ "./node_modules/@cloudbase/database/dist/esm/validate.js":
/*!***************************************************************!*\
  !*** ./node_modules/@cloudbase/database/dist/esm/validate.js ***!
  \***************************************************************/
/*! exports provided: Validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validate", function() { return Validate; });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/@cloudbase/database/dist/esm/constant.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/@cloudbase/database/dist/esm/util.js");


class Validate {
    static isGeopoint(point, degree) {
        if (_util__WEBPACK_IMPORTED_MODULE_1__["Util"].whichType(degree) !== _constant__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Number) {
            throw new Error('Geo Point must be number type');
        }
        const degreeAbs = Math.abs(degree);
        if (point === 'latitude' && degreeAbs > 90) {
            throw new Error('latitude should be a number ranges from -90 to 90');
        }
        else if (point === 'longitude' && degreeAbs > 180) {
            throw new Error('longitude should be a number ranges from -180 to 180');
        }
        return true;
    }
    static isInteger(param, num) {
        if (!Number.isInteger(num)) {
            throw new Error(param + _constant__WEBPACK_IMPORTED_MODULE_0__["ErrorCode"].IntergerError);
        }
        return true;
    }
    static isFieldOrder(direction) {
        if (_constant__WEBPACK_IMPORTED_MODULE_0__["OrderDirectionList"].indexOf(direction) === -1) {
            throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__["ErrorCode"].DirectionError);
        }
        return true;
    }
    static isFieldPath(path) {
        if (!/^[a-zA-Z0-9-_\.]/.test(path)) {
            throw new Error();
        }
        return true;
    }
    static isOperator(op) {
        if (_constant__WEBPACK_IMPORTED_MODULE_0__["WhereFilterOpList"].indexOf(op) === -1) {
            throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__["ErrorCode"].OpStrError);
        }
        return true;
    }
    static isCollName(name) {
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9-_]){1,32}$/.test(name)) {
            throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__["ErrorCode"].CollNameError);
        }
        return true;
    }
    static isDocID(docId) {
        if (!/^([a-fA-F0-9]){24}$/.test(docId)) {
            throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__["ErrorCode"].DocIDError);
        }
        return true;
    }
}


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/axios/node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/axios/node_modules/is-buffer/index.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/node_modules/is-buffer/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Query.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/Query.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      msg: "Hello world",
      text: '123'
    };
  }
});

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/bson/dist/bson.browser.esm.js":
/*!****************************************************!*\
  !*** ./node_modules/bson/dist/bson.browser.esm.js ***!
  \****************************************************/
/*! exports provided: default, BSON_INT32_MAX, BSON_INT32_MIN, BSON_INT64_MAX, BSON_INT64_MIN, JS_INT_MAX, JS_INT_MIN, BSON_DATA_NUMBER, BSON_DATA_STRING, BSON_DATA_OBJECT, BSON_DATA_ARRAY, BSON_DATA_BINARY, BSON_DATA_UNDEFINED, BSON_DATA_OID, BSON_DATA_BOOLEAN, BSON_DATA_DATE, BSON_DATA_NULL, BSON_DATA_REGEXP, BSON_DATA_DBPOINTER, BSON_DATA_CODE, BSON_DATA_SYMBOL, BSON_DATA_CODE_W_SCOPE, BSON_DATA_INT, BSON_DATA_TIMESTAMP, BSON_DATA_LONG, BSON_DATA_DECIMAL128, BSON_DATA_MIN_KEY, BSON_DATA_MAX_KEY, BSON_BINARY_SUBTYPE_DEFAULT, BSON_BINARY_SUBTYPE_FUNCTION, BSON_BINARY_SUBTYPE_BYTE_ARRAY, BSON_BINARY_SUBTYPE_UUID, BSON_BINARY_SUBTYPE_MD5, BSON_BINARY_SUBTYPE_USER_DEFINED, Code, BSONSymbol, DBRef, Binary, ObjectId, Long, Timestamp, Double, Int32, MinKey, MaxKey, BSONRegExp, Decimal128, serialize, serializeWithBufferAndIndex, deserialize, calculateObjectSize, deserializeStream, setInternalBufferSize, ObjectID, EJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_INT32_MAX", function() { return bson_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_INT32_MIN", function() { return bson_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_INT64_MAX", function() { return bson_3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_INT64_MIN", function() { return bson_4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JS_INT_MAX", function() { return bson_5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JS_INT_MIN", function() { return bson_6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_NUMBER", function() { return bson_7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_STRING", function() { return bson_8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_OBJECT", function() { return bson_9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_ARRAY", function() { return bson_10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_BINARY", function() { return bson_11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_UNDEFINED", function() { return bson_12; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_OID", function() { return bson_13; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_BOOLEAN", function() { return bson_14; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_DATE", function() { return bson_15; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_NULL", function() { return bson_16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_REGEXP", function() { return bson_17; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_DBPOINTER", function() { return bson_18; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_CODE", function() { return bson_19; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_SYMBOL", function() { return bson_20; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_CODE_W_SCOPE", function() { return bson_21; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_INT", function() { return bson_22; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_TIMESTAMP", function() { return bson_23; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_LONG", function() { return bson_24; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_DECIMAL128", function() { return bson_25; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_MIN_KEY", function() { return bson_26; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_DATA_MAX_KEY", function() { return bson_27; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_BINARY_SUBTYPE_DEFAULT", function() { return bson_28; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_BINARY_SUBTYPE_FUNCTION", function() { return bson_29; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_BINARY_SUBTYPE_BYTE_ARRAY", function() { return bson_30; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_BINARY_SUBTYPE_UUID", function() { return bson_31; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_BINARY_SUBTYPE_MD5", function() { return bson_32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSON_BINARY_SUBTYPE_USER_DEFINED", function() { return bson_33; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code", function() { return bson_34; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSONSymbol", function() { return bson_35; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DBRef", function() { return bson_36; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Binary", function() { return bson_37; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectId", function() { return bson_38; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Long", function() { return bson_39; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timestamp", function() { return bson_40; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Double", function() { return bson_41; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Int32", function() { return bson_42; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinKey", function() { return bson_43; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxKey", function() { return bson_44; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BSONRegExp", function() { return bson_45; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Decimal128", function() { return bson_46; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return bson_47; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeWithBufferAndIndex", function() { return bson_48; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserialize", function() { return bson_49; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateObjectSize", function() { return bson_50; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeStream", function() { return bson_51; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInternalBufferSize", function() { return bson_52; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectID", function() { return bson_53; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EJSON", function() { return bson_54; });
/* harmony import */ var long__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
/* harmony import */ var long__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(long__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_1__);



var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var map = createCommonjsModule(function (module) {

  if (typeof commonjsGlobal.Map !== 'undefined') {
    module.exports = commonjsGlobal.Map;
    module.exports.Map = commonjsGlobal.Map;
  } else {
    // We will return a polyfill
    var Map = function Map(array) {
      this._keys = [];
      this._values = {};

      for (var i = 0; i < array.length; i++) {
        if (array[i] == null) continue; // skip null and undefined

        var entry = array[i];
        var key = entry[0];
        var value = entry[1]; // Add the key to the list of keys in order

        this._keys.push(key); // Add the key and value to the values dictionary with a point
        // to the location in the ordered keys list


        this._values[key] = {
          v: value,
          i: this._keys.length - 1
        };
      }
    };

    Map.prototype.clear = function () {
      this._keys = [];
      this._values = {};
    };

    Map.prototype.delete = function (key) {
      var value = this._values[key];
      if (value == null) return false; // Delete entry

      delete this._values[key]; // Remove the key from the ordered keys list

      this._keys.splice(value.i, 1);

      return true;
    };

    Map.prototype.entries = function () {
      var self = this;
      var index = 0;
      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? [key, self._values[key].v] : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    Map.prototype.forEach = function (callback, self) {
      self = self || this;

      for (var i = 0; i < this._keys.length; i++) {
        var key = this._keys[i]; // Call the forEach callback

        callback.call(self, this._values[key].v, key, self);
      }
    };

    Map.prototype.get = function (key) {
      return this._values[key] ? this._values[key].v : undefined;
    };

    Map.prototype.has = function (key) {
      return this._values[key] != null;
    };

    Map.prototype.keys = function () {
      var self = this;
      var index = 0;
      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? key : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    };

    Map.prototype.set = function (key, value) {
      if (this._values[key]) {
        this._values[key].v = value;
        return this;
      } // Add the key to the list of keys in order


      this._keys.push(key); // Add the key and value to the values dictionary with a point
      // to the location in the ordered keys list


      this._values[key] = {
        v: value,
        i: this._keys.length - 1
      };
      return this;
    };

    Map.prototype.values = function () {
      var self = this;
      var index = 0;
      return {
        next: function next() {
          var key = self._keys[index++];
          return {
            value: key !== undefined ? self._values[key].v : undefined,
            done: key !== undefined ? false : true
          };
        }
      };
    }; // Last ismaster


    Object.defineProperty(Map.prototype, 'size', {
      enumerable: true,
      get: function get() {
        return this._keys.length;
      }
    });
    module.exports = Map;
  }
});
var map_1 = map.Map;

/**
 * @ignore
 */


long__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.toExtendedJSON = function (options) {
  if (options && options.relaxed) return this.toNumber();
  return {
    $numberLong: this.toString()
  };
};
/**
 * @ignore
 */


long__WEBPACK_IMPORTED_MODULE_0___default.a.fromExtendedJSON = function (doc, options) {
  var result = long__WEBPACK_IMPORTED_MODULE_0___default.a.fromString(doc.$numberLong);
  return options && options.relaxed ? result.toNumber() : result;
};

Object.defineProperty(long__WEBPACK_IMPORTED_MODULE_0___default.a.prototype, '_bsontype', {
  value: 'Long'
});
var long_1 = long__WEBPACK_IMPORTED_MODULE_0___default.a;

/**
 * A class representation of the BSON Double type.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Double =
/*#__PURE__*/
function () {
  /**
   * Create a Double type
   *
   * @param {number} value the number we want to represent as a double.
   * @return {Double}
   */
  function Double(value) {
    _classCallCheck(this, Double);

    this.value = value;
  }
  /**
   * Access the number value.
   *
   * @method
   * @return {number} returns the wrapped double number.
   */


  _createClass(Double, [{
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "toExtendedJSON",
    value: function toExtendedJSON(options) {
      if (options && options.relaxed && isFinite(this.value)) return this.value;
      return {
        $numberDouble: this.value.toString()
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc, options) {
      return options && options.relaxed ? parseFloat(doc.$numberDouble) : new Double(parseFloat(doc.$numberDouble));
    }
  }]);

  return Double;
}();

Object.defineProperty(Double.prototype, '_bsontype', {
  value: 'Double'
});
var double_1 = Double;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/**
 * @class
 * @param {number} low  the low (signed) 32 bits of the Timestamp.
 * @param {number} high the high (signed) 32 bits of the Timestamp.
 * @return {Timestamp}
 */


var Timestamp =
/*#__PURE__*/
function (_Long) {
  _inherits(Timestamp, _Long);

  function Timestamp(low, high) {
    var _this;

    _classCallCheck$1(this, Timestamp);

    if (long_1.isLong(low)) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Timestamp).call(this, low.low, low.high));
    } else {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Timestamp).call(this, low, high));
    }

    return _possibleConstructorReturn(_this);
  }
  /**
   * Return the JSON value.
   *
   * @method
   * @return {String} the JSON representation.
   */


  _createClass$1(Timestamp, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        $timestamp: this.toString()
      };
    }
    /**
     * Returns a Timestamp represented by the given (32-bit) integer value.
     *
     * @method
     * @param {number} value the 32-bit integer in question.
     * @return {Timestamp} the timestamp.
     */

  }, {
    key: "toExtendedJSON",

    /**
     * @ignore
     */
    value: function toExtendedJSON() {
      return {
        $timestamp: {
          t: this.high,
          i: this.low
        }
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromInt",
    value: function fromInt(value) {
      return new Timestamp(long_1.fromInt(value));
    }
    /**
     * Returns a Timestamp representing the given number value, provided that it is a finite number. Otherwise, zero is returned.
     *
     * @method
     * @param {number} value the number in question.
     * @return {Timestamp} the timestamp.
     */

  }, {
    key: "fromNumber",
    value: function fromNumber(value) {
      return new Timestamp(long_1.fromNumber(value));
    }
    /**
     * Returns a Timestamp for the given high and low bits. Each is assumed to use 32 bits.
     *
     * @method
     * @param {number} lowBits the low 32-bits.
     * @param {number} highBits the high 32-bits.
     * @return {Timestamp} the timestamp.
     */

  }, {
    key: "fromBits",
    value: function fromBits(lowBits, highBits) {
      return new Timestamp(lowBits, highBits);
    }
    /**
     * Returns a Timestamp from the given string, optionally using the given radix.
     *
     * @method
     * @param {String} str the textual representation of the Timestamp.
     * @param {number} [opt_radix] the radix in which the text is written.
     * @return {Timestamp} the timestamp.
     */

  }, {
    key: "fromString",
    value: function fromString(str, opt_radix) {
      return new Timestamp(long_1.fromString(str, opt_radix));
    }
  }, {
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc) {
      return new Timestamp(doc.$timestamp.i, doc.$timestamp.t);
    }
  }]);

  return Timestamp;
}(long_1);

Object.defineProperty(Timestamp.prototype, '_bsontype', {
  value: 'Timestamp'
});
var timestamp = Timestamp;

var require$$0 = {};

/* global window */

/**
 * Normalizes our expected stringified form of a function across versions of node
 * @param {Function} fn The function to stringify
 */


function normalizedFunctionString(fn) {
  return fn.toString().replace('function(', 'function (');
}

function insecureRandomBytes(size) {
  var result = new Uint8Array(size);

  for (var i = 0; i < size; ++i) {
    result[i] = Math.floor(Math.random() * 256);
  }

  return result;
}

var randomBytes = insecureRandomBytes;

if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
  randomBytes = function randomBytes(size) {
    return window.crypto.getRandomValues(new Uint8Array(size));
  };
} else {
  try {
    randomBytes = require$$0.randomBytes;
  } catch (e) {} // keep the fallback
  // NOTE: in transpiled cases the above require might return null/undefined


  if (randomBytes == null) {
    randomBytes = insecureRandomBytes;
  }
}

var utils = {
  normalizedFunctionString: normalizedFunctionString,
  randomBytes: randomBytes
};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;

if (typeof global.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}

if (typeof global.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

function nextTick(fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
} // v8 likes predictible objects

function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues

var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var performance = global.performance || {};

var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
}; // generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime


function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];

    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }

  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var inherits;

if (typeof Object.create === 'function') {
  inherits = function inherits(ctor, superCtor) {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

var inherits$1 = inherits;

function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
var formatRegExp = /%[sdj%]/g;
function format(f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.

function deprecate(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
}
var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;

      debugs[set] = function () {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
}
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/

function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
} // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function (prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}
function isBoolean(arg) {
  return typeof arg === 'boolean';
}
function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return arg == null;
}
function isNumber(arg) {
  return typeof arg === 'number';
}
function isString(arg) {
  return typeof arg === 'string';
}
function isSymbol(arg) {
  return _typeof$1(arg) === 'symbol';
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
function isObject(arg) {
  return _typeof$1(arg) === 'object' && arg !== null;
}
function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
function isFunction(arg) {
  return typeof arg === 'function';
}
function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof$1(arg) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
function isBuffer(maybeBuf) {
  return Buffer.isBuffer(maybeBuf);
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp$1() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


function log() {
  console.log('%s - %s', timestamp$1(), format.apply(null, arguments));
}
function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var util = {
  inherits: inherits$1,
  _extend: _extend,
  log: log,
  isBuffer: isBuffer,
  isPrimitive: isPrimitive,
  isFunction: isFunction,
  isError: isError,
  isDate: isDate,
  isObject: isObject,
  isRegExp: isRegExp,
  isUndefined: isUndefined,
  isSymbol: isSymbol,
  isString: isString,
  isNumber: isNumber,
  isNullOrUndefined: isNullOrUndefined,
  isNull: isNull,
  isBoolean: isBoolean,
  isArray: isArray,
  inspect: inspect,
  deprecate: deprecate,
  format: format,
  debuglog: debuglog
};

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }

var Buffer$1 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer;
var randomBytes$1 = utils.randomBytes;
var deprecate$1 = util.deprecate; // constants

var PROCESS_UNIQUE = randomBytes$1(5); // Regular expression that checks for hex value

var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
var hasBufferType = false; // Check if buffer exists

try {
  if (Buffer$1 && Buffer$1.from) hasBufferType = true;
} catch (err) {
  hasBufferType = false;
} // Precomputed hex table enables speedy hex string conversion


var hexTable = [];

for (var _i = 0; _i < 256; _i++) {
  hexTable[_i] = (_i <= 15 ? '0' : '') + _i.toString(16);
} // Lookup tables


var decodeLookup = [];
var i = 0;

while (i < 10) {
  decodeLookup[0x30 + i] = i++;
}

while (i < 16) {
  decodeLookup[0x41 - 10 + i] = decodeLookup[0x61 - 10 + i] = i++;
}

var _Buffer = Buffer$1;

function convertToHex(bytes) {
  return bytes.toString('hex');
}

function makeObjectIdError(invalidString, index) {
  var invalidCharacter = invalidString[index];
  return new TypeError("ObjectId string \"".concat(invalidString, "\" contains invalid character \"").concat(invalidCharacter, "\" with character code (").concat(invalidString.charCodeAt(index), "). All character codes for a non-hex string must be less than 256."));
}
/**
 * A class representation of the BSON ObjectId type.
 */


var ObjectId =
/*#__PURE__*/
function () {
  /**
   * Create an ObjectId type
   *
   * @param {(string|Buffer|number)} id Can be a 24 byte hex string, 12 byte binary Buffer, or a Number.
   * @property {number} generationTime The generation time of this ObjectId instance
   * @return {ObjectId} instance of ObjectId.
   */
  function ObjectId(id) {
    _classCallCheck$2(this, ObjectId);

    // Duck-typing to support ObjectId from different npm packages
    if (id instanceof ObjectId) return id; // The most common usecase (blank id, new objectId instance)

    if (id == null || typeof id === 'number') {
      // Generate a new id
      this.id = ObjectId.generate(id); // If we are caching the hex string

      if (ObjectId.cacheHexString) this.__id = this.toString('hex'); // Return the object

      return;
    } // Check if the passed in id is valid


    var valid = ObjectId.isValid(id); // Throw an error if it's not a valid setup

    if (!valid && id != null) {
      throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
    } else if (valid && typeof id === 'string' && id.length === 24 && hasBufferType) {
      return new ObjectId(Buffer$1.from(id, 'hex'));
    } else if (valid && typeof id === 'string' && id.length === 24) {
      return ObjectId.createFromHexString(id);
    } else if (id != null && id.length === 12) {
      // assume 12 byte string
      this.id = id;
    } else if (id != null && id.toHexString) {
      // Duck-typing to support ObjectId from different npm packages
      return ObjectId.createFromHexString(id.toHexString());
    } else {
      throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
    }

    if (ObjectId.cacheHexString) this.__id = this.toString('hex');
  }
  /**
   * Return the ObjectId id as a 24 byte hex string representation
   *
   * @method
   * @return {string} return the 24 byte hex string representation.
   */


  _createClass$2(ObjectId, [{
    key: "toHexString",
    value: function toHexString() {
      if (ObjectId.cacheHexString && this.__id) return this.__id;
      var hexString = '';

      if (!this.id || !this.id.length) {
        throw new TypeError('invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [' + JSON.stringify(this.id) + ']');
      }

      if (this.id instanceof _Buffer) {
        hexString = convertToHex(this.id);
        if (ObjectId.cacheHexString) this.__id = hexString;
        return hexString;
      }

      for (var _i2 = 0; _i2 < this.id.length; _i2++) {
        var hexChar = hexTable[this.id.charCodeAt(_i2)];

        if (typeof hexChar !== 'string') {
          throw makeObjectIdError(this.id, _i2);
        }

        hexString += hexChar;
      }

      if (ObjectId.cacheHexString) this.__id = hexString;
      return hexString;
    }
    /**
     * Update the ObjectId index used in generating new ObjectId's on the driver
     *
     * @method
     * @return {number} returns next index value.
     * @ignore
     */

  }, {
    key: "toString",

    /**
     * Converts the id into a 24 byte hex string for printing
     *
     * @param {String} format The Buffer toString format parameter.
     * @return {String} return the 24 byte hex string representation.
     * @ignore
     */
    value: function toString(format) {
      // Is the id a buffer then use the buffer toString method to return the format
      if (this.id && this.id.copy) {
        return this.id.toString(typeof format === 'string' ? format : 'hex');
      }

      return this.toHexString();
    }
    /**
     * Converts to its JSON representation.
     *
     * @return {String} return the 24 byte hex string representation.
     * @ignore
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toHexString();
    }
    /**
     * Compares the equality of this ObjectId with `otherID`.
     *
     * @method
     * @param {object} otherId ObjectId instance to compare against.
     * @return {boolean} the result of comparing two ObjectId's
     */

  }, {
    key: "equals",
    value: function equals(otherId) {
      if (otherId instanceof ObjectId) {
        return this.toString() === otherId.toString();
      }

      if (typeof otherId === 'string' && ObjectId.isValid(otherId) && otherId.length === 12 && this.id instanceof _Buffer) {
        return otherId === this.id.toString('binary');
      }

      if (typeof otherId === 'string' && ObjectId.isValid(otherId) && otherId.length === 24) {
        return otherId.toLowerCase() === this.toHexString();
      }

      if (typeof otherId === 'string' && ObjectId.isValid(otherId) && otherId.length === 12) {
        return otherId === this.id;
      }

      if (otherId != null && (otherId instanceof ObjectId || otherId.toHexString)) {
        return otherId.toHexString() === this.toHexString();
      }

      return false;
    }
    /**
     * Returns the generation date (accurate up to the second) that this ID was generated.
     *
     * @method
     * @return {Date} the generation date
     */

  }, {
    key: "getTimestamp",
    value: function getTimestamp() {
      var timestamp = new Date();
      var time = this.id.readUInt32BE(0);
      timestamp.setTime(Math.floor(time) * 1000);
      return timestamp;
    }
    /**
     * @ignore
     */

  }, {
    key: "toExtendedJSON",

    /**
     * @ignore
     */
    value: function toExtendedJSON() {
      if (this.toHexString) return {
        $oid: this.toHexString()
      };
      return {
        $oid: this.toString('hex')
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "getInc",
    value: function getInc() {
      return ObjectId.index = (ObjectId.index + 1) % 0xffffff;
    }
    /**
     * Generate a 12 byte id buffer used in ObjectId's
     *
     * @method
     * @param {number} [time] optional parameter allowing to pass in a second based timestamp.
     * @return {Buffer} return the 12 byte id buffer string.
     */

  }, {
    key: "generate",
    value: function generate(time) {
      if ('number' !== typeof time) {
        time = ~~(Date.now() / 1000);
      }

      var inc = ObjectId.getInc();
      var buffer$$1 = Buffer$1.alloc(12); // 4-byte timestamp

      buffer$$1[3] = time & 0xff;
      buffer$$1[2] = time >> 8 & 0xff;
      buffer$$1[1] = time >> 16 & 0xff;
      buffer$$1[0] = time >> 24 & 0xff; // 5-byte process unique

      buffer$$1[4] = PROCESS_UNIQUE[0];
      buffer$$1[5] = PROCESS_UNIQUE[1];
      buffer$$1[6] = PROCESS_UNIQUE[2];
      buffer$$1[7] = PROCESS_UNIQUE[3];
      buffer$$1[8] = PROCESS_UNIQUE[4]; // 3-byte counter

      buffer$$1[11] = inc & 0xff;
      buffer$$1[10] = inc >> 8 & 0xff;
      buffer$$1[9] = inc >> 16 & 0xff;
      return buffer$$1;
    }
  }, {
    key: "createPk",
    value: function createPk() {
      return new ObjectId();
    }
    /**
     * Creates an ObjectId from a second based number, with the rest of the ObjectId zeroed out. Used for comparisons or sorting the ObjectId.
     *
     * @method
     * @param {number} time an integer number representing a number of seconds.
     * @return {ObjectId} return the created ObjectId
     */

  }, {
    key: "createFromTime",
    value: function createFromTime(time) {
      var buffer$$1 = Buffer$1.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // Encode time into first 4 bytes

      buffer$$1[3] = time & 0xff;
      buffer$$1[2] = time >> 8 & 0xff;
      buffer$$1[1] = time >> 16 & 0xff;
      buffer$$1[0] = time >> 24 & 0xff; // Return the new objectId

      return new ObjectId(buffer$$1);
    }
    /**
     * Creates an ObjectId from a hex string representation of an ObjectId.
     *
     * @method
     * @param {string} hexString create a ObjectId from a passed in 24 byte hexstring.
     * @return {ObjectId} return the created ObjectId
     */

  }, {
    key: "createFromHexString",
    value: function createFromHexString(string) {
      // Throw an error if it's not a valid setup
      if (typeof string === 'undefined' || string != null && string.length !== 24) {
        throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
      } // Use Buffer.from method if available


      if (hasBufferType) return new ObjectId(Buffer$1.from(string, 'hex')); // Calculate lengths

      var array = new _Buffer(12);
      var n = 0;
      var i = 0;

      while (i < 24) {
        array[n++] = decodeLookup[string.charCodeAt(i++)] << 4 | decodeLookup[string.charCodeAt(i++)];
      }

      return new ObjectId(array);
    }
    /**
     * Checks if a value is a valid bson ObjectId
     *
     * @method
     * @return {boolean} return true if the value is a valid bson ObjectId, return false otherwise.
     */

  }, {
    key: "isValid",
    value: function isValid(id) {
      if (id == null) return false;

      if (typeof id === 'number') {
        return true;
      }

      if (typeof id === 'string') {
        return id.length === 12 || id.length === 24 && checkForHexRegExp.test(id);
      }

      if (id instanceof ObjectId) {
        return true;
      }

      if (id instanceof _Buffer && id.length === 12) {
        return true;
      } // Duck-Typing detection of ObjectId like objects


      if (id.toHexString) {
        return id.id.length === 12 || id.id.length === 24 && checkForHexRegExp.test(id.id);
      }

      return false;
    }
  }, {
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc) {
      return new ObjectId(doc.$oid);
    }
  }]);

  return ObjectId;
}(); // Deprecated methods


ObjectId.get_inc = deprecate$1(function () {
  return ObjectId.getInc();
}, 'Please use the static `ObjectId.getInc()` instead');
ObjectId.prototype.get_inc = deprecate$1(function () {
  return ObjectId.getInc();
}, 'Please use the static `ObjectId.getInc()` instead');
ObjectId.prototype.getInc = deprecate$1(function () {
  return ObjectId.getInc();
}, 'Please use the static `ObjectId.getInc()` instead');
ObjectId.prototype.generate = deprecate$1(function (time) {
  return ObjectId.generate(time);
}, 'Please use the static `ObjectId.generate(time)` instead');
/**
 * @ignore
 */

Object.defineProperty(ObjectId.prototype, 'generationTime', {
  enumerable: true,
  get: function get() {
    return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
  },
  set: function set(value) {
    // Encode time into first 4 bytes
    this.id[3] = value & 0xff;
    this.id[2] = value >> 8 & 0xff;
    this.id[1] = value >> 16 & 0xff;
    this.id[0] = value >> 24 & 0xff;
  }
});
/**
 * Converts to a string representation of this Id.
 *
 * @return {String} return the 24 byte hex string representation.
 * @ignore
 */

ObjectId.prototype[util.inspect.custom || 'inspect'] = ObjectId.prototype.toString;
/**
 * @ignore
 */

ObjectId.index = ~~(Math.random() * 0xffffff); // In 4.0.0 and 4.0.1, this property name was changed to ObjectId to match the class name.
// This caused interoperability problems with previous versions of the library, so in
// later builds we changed it back to ObjectID (capital D) to match legacy implementations.

Object.defineProperty(ObjectId.prototype, '_bsontype', {
  value: 'ObjectID'
});
var objectid = ObjectId;

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }

function alphabetize(str) {
  return str.split('').sort().join('');
}
/**
 * A class representation of the BSON RegExp type.
 */


var BSONRegExp =
/*#__PURE__*/
function () {
  /**
   * Create a RegExp type
   *
   * @param {string} pattern The regular expression pattern to match
   * @param {string} options The regular expression options
   */
  function BSONRegExp(pattern, options) {
    _classCallCheck$3(this, BSONRegExp);

    // Execute
    this.pattern = pattern || '';
    this.options = options ? alphabetize(options) : ''; // Validate options

    for (var i = 0; i < this.options.length; i++) {
      if (!(this.options[i] === 'i' || this.options[i] === 'm' || this.options[i] === 'x' || this.options[i] === 'l' || this.options[i] === 's' || this.options[i] === 'u')) {
        throw new Error("The regular expression option [".concat(this.options[i], "] is not supported"));
      }
    }
  }
  /**
   * @ignore
   */


  _createClass$3(BSONRegExp, [{
    key: "toExtendedJSON",
    value: function toExtendedJSON() {
      return {
        $regularExpression: {
          pattern: this.pattern,
          options: this.options
        }
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc) {
      return new BSONRegExp(doc.$regularExpression.pattern, doc.$regularExpression.options.split('').sort().join(''));
    }
  }]);

  return BSONRegExp;
}();

Object.defineProperty(BSONRegExp.prototype, '_bsontype', {
  value: 'BSONRegExp'
});
var regexp = BSONRegExp;

/**
 * A class representation of the BSON Symbol type.
 */

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }

var BSONSymbol =
/*#__PURE__*/
function () {
  /**
   * Create a Symbol type
   *
   * @param {string} value the string representing the symbol.
   */
  function BSONSymbol(value) {
    _classCallCheck$4(this, BSONSymbol);

    this.value = value;
  }
  /**
   * Access the wrapped string value.
   *
   * @method
   * @return {String} returns the wrapped string.
   */


  _createClass$4(BSONSymbol, [{
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "inspect",
    value: function inspect() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "toExtendedJSON",
    value: function toExtendedJSON() {
      return {
        $symbol: this.value
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc) {
      return new BSONSymbol(doc.$symbol);
    }
  }]);

  return BSONSymbol;
}();

Object.defineProperty(BSONSymbol.prototype, '_bsontype', {
  value: 'Symbol'
});
var symbol = BSONSymbol;

/**
 * A class representation of a BSON Int32 type.
 */

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); return Constructor; }

var Int32 =
/*#__PURE__*/
function () {
  /**
   * Create an Int32 type
   *
   * @param {number} value the number we want to represent as an int32.
   * @return {Int32}
   */
  function Int32(value) {
    _classCallCheck$5(this, Int32);

    this.value = value;
  }
  /**
   * Access the number value.
   *
   * @method
   * @return {number} returns the wrapped int32 number.
   */


  _createClass$5(Int32, [{
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.value;
    }
    /**
     * @ignore
     */

  }, {
    key: "toExtendedJSON",
    value: function toExtendedJSON(options) {
      if (options && options.relaxed) return this.value;
      return {
        $numberInt: this.value.toString()
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc, options) {
      return options && options.relaxed ? parseInt(doc.$numberInt, 10) : new Int32(doc.$numberInt);
    }
  }]);

  return Int32;
}();

Object.defineProperty(Int32.prototype, '_bsontype', {
  value: 'Int32'
});
var int_32 = Int32;

/**
 * A class representation of the BSON Code type.
 */

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$6(Constructor.prototype, protoProps); if (staticProps) _defineProperties$6(Constructor, staticProps); return Constructor; }

var Code =
/*#__PURE__*/
function () {
  /**
   * Create a Code type
   *
   * @param {(string|function)} code a string or function.
   * @param {Object} [scope] an optional scope for the function.
   * @return {Code}
   */
  function Code(code, scope) {
    _classCallCheck$6(this, Code);

    this.code = code;
    this.scope = scope;
  }
  /**
   * @ignore
   */


  _createClass$6(Code, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        scope: this.scope,
        code: this.code
      };
    }
    /**
     * @ignore
     */

  }, {
    key: "toExtendedJSON",
    value: function toExtendedJSON() {
      if (this.scope) {
        return {
          $code: this.code,
          $scope: this.scope
        };
      }

      return {
        $code: this.code
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc) {
      return new Code(doc.$code, doc.$scope);
    }
  }]);

  return Code;
}();

Object.defineProperty(Code.prototype, '_bsontype', {
  value: 'Code'
});
var code = Code;

var Buffer$2 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer;
var PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
var PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i;
var PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i;
var EXPONENT_MAX = 6111;
var EXPONENT_MIN = -6176;
var EXPONENT_BIAS = 6176;
var MAX_DIGITS = 34; // Nan value bits as 32 bit values (due to lack of longs)

var NAN_BUFFER = [0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse(); // Infinity value bits 32 bit values (due to lack of longs)

var INF_NEGATIVE_BUFFER = [0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
var INF_POSITIVE_BUFFER = [0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
var EXPONENT_REGEX = /^([-+])?(\d+)?$/; // Detect if the value is a digit

function isDigit(value) {
  return !isNaN(parseInt(value, 10));
} // Divide two uint128 values


function divideu128(value) {
  var DIVISOR = long_1.fromNumber(1000 * 1000 * 1000);

  var _rem = long_1.fromNumber(0);

  if (!value.parts[0] && !value.parts[1] && !value.parts[2] && !value.parts[3]) {
    return {
      quotient: value,
      rem: _rem
    };
  }

  for (var i = 0; i <= 3; i++) {
    // Adjust remainder to match value of next dividend
    _rem = _rem.shiftLeft(32); // Add the divided to _rem

    _rem = _rem.add(new long_1(value.parts[i], 0));
    value.parts[i] = _rem.div(DIVISOR).low;
    _rem = _rem.modulo(DIVISOR);
  }

  return {
    quotient: value,
    rem: _rem
  };
} // Multiply two Long values and return the 128 bit value


function multiply64x2(left, right) {
  if (!left && !right) {
    return {
      high: long_1.fromNumber(0),
      low: long_1.fromNumber(0)
    };
  }

  var leftHigh = left.shiftRightUnsigned(32);
  var leftLow = new long_1(left.getLowBits(), 0);
  var rightHigh = right.shiftRightUnsigned(32);
  var rightLow = new long_1(right.getLowBits(), 0);
  var productHigh = leftHigh.multiply(rightHigh);
  var productMid = leftHigh.multiply(rightLow);
  var productMid2 = leftLow.multiply(rightHigh);
  var productLow = leftLow.multiply(rightLow);
  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productMid = new long_1(productMid.getLowBits(), 0).add(productMid2).add(productLow.shiftRightUnsigned(32));
  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productLow = productMid.shiftLeft(32).add(new long_1(productLow.getLowBits(), 0)); // Return the 128 bit result

  return {
    high: productHigh,
    low: productLow
  };
}

function lessThan(left, right) {
  // Make values unsigned
  var uhleft = left.high >>> 0;
  var uhright = right.high >>> 0; // Compare high bits first

  if (uhleft < uhright) {
    return true;
  } else if (uhleft === uhright) {
    var ulleft = left.low >>> 0;
    var ulright = right.low >>> 0;
    if (ulleft < ulright) return true;
  }

  return false;
}

function invalidErr(string, message) {
  throw new TypeError("\"".concat(string, "\" is not a valid Decimal128 string - ").concat(message));
}
/**
 * A class representation of the BSON Decimal128 type.
 *
 * @class
 * @param {Buffer} bytes a buffer containing the raw Decimal128 bytes.
 * @return {Double}
 */


function Decimal128(bytes) {
  this.bytes = bytes;
}
/**
 * Create a Decimal128 instance from a string representation
 *
 * @method
 * @param {string} string a numeric string representation.
 * @return {Decimal128} returns a Decimal128 instance.
 */


Decimal128.fromString = function (string) {
  // Parse state tracking
  var isNegative = false;
  var sawRadix = false;
  var foundNonZero = false; // Total number of significant digits (no leading or trailing zero)

  var significantDigits = 0; // Total number of significand digits read

  var nDigitsRead = 0; // Total number of digits (no leading zeros)

  var nDigits = 0; // The number of the digits after radix

  var radixPosition = 0; // The index of the first non-zero in *str*

  var firstNonZero = 0; // Digits Array

  var digits = [0]; // The number of digits in digits

  var nDigitsStored = 0; // Insertion pointer for digits

  var digitsInsert = 0; // The index of the first non-zero digit

  var firstDigit = 0; // The index of the last digit

  var lastDigit = 0; // Exponent

  var exponent = 0; // loop index over array

  var i = 0; // The high 17 digits of the significand

  var significandHigh = [0, 0]; // The low 17 digits of the significand

  var significandLow = [0, 0]; // The biased exponent

  var biasedExponent = 0; // Read index

  var index = 0; // Naively prevent against REDOS attacks.
  // TODO: implementing a custom parsing for this, or refactoring the regex would yield
  //       further gains.

  if (string.length >= 7000) {
    throw new TypeError('' + string + ' not a valid Decimal128 string');
  } // Results


  var stringMatch = string.match(PARSE_STRING_REGEXP);
  var infMatch = string.match(PARSE_INF_REGEXP);
  var nanMatch = string.match(PARSE_NAN_REGEXP); // Validate the string

  if (!stringMatch && !infMatch && !nanMatch || string.length === 0) {
    throw new TypeError('' + string + ' not a valid Decimal128 string');
  }

  if (stringMatch) {
    // full_match = stringMatch[0]
    // sign = stringMatch[1]
    var unsignedNumber = stringMatch[2]; // stringMatch[3] is undefined if a whole number (ex "1", 12")
    // but defined if a number w/ decimal in it (ex "1.0, 12.2")

    var e = stringMatch[4];
    var expSign = stringMatch[5];
    var expNumber = stringMatch[6]; // they provided e, but didn't give an exponent number. for ex "1e"

    if (e && expNumber === undefined) invalidErr(string, 'missing exponent power'); // they provided e, but didn't give a number before it. for ex "e1"

    if (e && unsignedNumber === undefined) invalidErr(string, 'missing exponent base');

    if (e === undefined && (expSign || expNumber)) {
      invalidErr(string, 'missing e before exponent');
    }
  } // Get the negative or positive sign


  if (string[index] === '+' || string[index] === '-') {
    isNegative = string[index++] === '-';
  } // Check if user passed Infinity or NaN


  if (!isDigit(string[index]) && string[index] !== '.') {
    if (string[index] === 'i' || string[index] === 'I') {
      return new Decimal128(Buffer$2.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
    } else if (string[index] === 'N') {
      return new Decimal128(Buffer$2.from(NAN_BUFFER));
    }
  } // Read all the digits


  while (isDigit(string[index]) || string[index] === '.') {
    if (string[index] === '.') {
      if (sawRadix) invalidErr(string, 'contains multiple periods');
      sawRadix = true;
      index = index + 1;
      continue;
    }

    if (nDigitsStored < 34) {
      if (string[index] !== '0' || foundNonZero) {
        if (!foundNonZero) {
          firstNonZero = nDigitsRead;
        }

        foundNonZero = true; // Only store 34 digits

        digits[digitsInsert++] = parseInt(string[index], 10);
        nDigitsStored = nDigitsStored + 1;
      }
    }

    if (foundNonZero) nDigits = nDigits + 1;
    if (sawRadix) radixPosition = radixPosition + 1;
    nDigitsRead = nDigitsRead + 1;
    index = index + 1;
  }

  if (sawRadix && !nDigitsRead) throw new TypeError('' + string + ' not a valid Decimal128 string'); // Read exponent if exists

  if (string[index] === 'e' || string[index] === 'E') {
    // Read exponent digits
    var match = string.substr(++index).match(EXPONENT_REGEX); // No digits read

    if (!match || !match[2]) return new Decimal128(Buffer$2.from(NAN_BUFFER)); // Get exponent

    exponent = parseInt(match[0], 10); // Adjust the index

    index = index + match[0].length;
  } // Return not a number


  if (string[index]) return new Decimal128(Buffer$2.from(NAN_BUFFER)); // Done reading input
  // Find first non-zero digit in digits

  firstDigit = 0;

  if (!nDigitsStored) {
    firstDigit = 0;
    lastDigit = 0;
    digits[0] = 0;
    nDigits = 1;
    nDigitsStored = 1;
    significantDigits = 0;
  } else {
    lastDigit = nDigitsStored - 1;
    significantDigits = nDigits;

    if (significantDigits !== 1) {
      while (string[firstNonZero + significantDigits - 1] === '0') {
        significantDigits = significantDigits - 1;
      }
    }
  } // Normalization of exponent
  // Correct exponent based on radix position, and shift significand as needed
  // to represent user input
  // Overflow prevention


  if (exponent <= radixPosition && radixPosition - exponent > 1 << 14) {
    exponent = EXPONENT_MIN;
  } else {
    exponent = exponent - radixPosition;
  } // Attempt to normalize the exponent


  while (exponent > EXPONENT_MAX) {
    // Shift exponent to significand and decrease
    lastDigit = lastDigit + 1;

    if (lastDigit - firstDigit > MAX_DIGITS) {
      // Check if we have a zero then just hard clamp, otherwise fail
      var digitsString = digits.join('');

      if (digitsString.match(/^0+$/)) {
        exponent = EXPONENT_MAX;
        break;
      }

      invalidErr(string, 'overflow');
    }

    exponent = exponent - 1;
  }

  while (exponent < EXPONENT_MIN || nDigitsStored < nDigits) {
    // Shift last digit. can only do this if < significant digits than # stored.
    if (lastDigit === 0 && significantDigits < nDigitsStored) {
      exponent = EXPONENT_MIN;
      significantDigits = 0;
      break;
    }

    if (nDigitsStored < nDigits) {
      // adjust to match digits not stored
      nDigits = nDigits - 1;
    } else {
      // adjust to round
      lastDigit = lastDigit - 1;
    }

    if (exponent < EXPONENT_MAX) {
      exponent = exponent + 1;
    } else {
      // Check if we have a zero then just hard clamp, otherwise fail
      var _digitsString = digits.join('');

      if (_digitsString.match(/^0+$/)) {
        exponent = EXPONENT_MAX;
        break;
      }

      invalidErr(string, 'overflow');
    }
  } // Round
  // We've normalized the exponent, but might still need to round.


  if (lastDigit - firstDigit + 1 < significantDigits) {
    var endOfString = nDigitsRead; // If we have seen a radix point, 'string' is 1 longer than we have
    // documented with ndigits_read, so inc the position of the first nonzero
    // digit and the position that digits are read to.

    if (sawRadix) {
      firstNonZero = firstNonZero + 1;
      endOfString = endOfString + 1;
    } // if negative, we need to increment again to account for - sign at start.


    if (isNegative) {
      firstNonZero = firstNonZero + 1;
      endOfString = endOfString + 1;
    }

    var roundDigit = parseInt(string[firstNonZero + lastDigit + 1], 10);
    var roundBit = 0;

    if (roundDigit >= 5) {
      roundBit = 1;

      if (roundDigit === 5) {
        roundBit = digits[lastDigit] % 2 === 1;

        for (i = firstNonZero + lastDigit + 2; i < endOfString; i++) {
          if (parseInt(string[i], 10)) {
            roundBit = 1;
            break;
          }
        }
      }
    }

    if (roundBit) {
      var dIdx = lastDigit;

      for (; dIdx >= 0; dIdx--) {
        if (++digits[dIdx] > 9) {
          digits[dIdx] = 0; // overflowed most significant digit

          if (dIdx === 0) {
            if (exponent < EXPONENT_MAX) {
              exponent = exponent + 1;
              digits[dIdx] = 1;
            } else {
              return new Decimal128(Buffer$2.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
            }
          }
        }
      }
    }
  } // Encode significand
  // The high 17 digits of the significand


  significandHigh = long_1.fromNumber(0); // The low 17 digits of the significand

  significandLow = long_1.fromNumber(0); // read a zero

  if (significantDigits === 0) {
    significandHigh = long_1.fromNumber(0);
    significandLow = long_1.fromNumber(0);
  } else if (lastDigit - firstDigit < 17) {
    var _dIdx = firstDigit;
    significandLow = long_1.fromNumber(digits[_dIdx++]);
    significandHigh = new long_1(0, 0);

    for (; _dIdx <= lastDigit; _dIdx++) {
      significandLow = significandLow.multiply(long_1.fromNumber(10));
      significandLow = significandLow.add(long_1.fromNumber(digits[_dIdx]));
    }
  } else {
    var _dIdx2 = firstDigit;
    significandHigh = long_1.fromNumber(digits[_dIdx2++]);

    for (; _dIdx2 <= lastDigit - 17; _dIdx2++) {
      significandHigh = significandHigh.multiply(long_1.fromNumber(10));
      significandHigh = significandHigh.add(long_1.fromNumber(digits[_dIdx2]));
    }

    significandLow = long_1.fromNumber(digits[_dIdx2++]);

    for (; _dIdx2 <= lastDigit; _dIdx2++) {
      significandLow = significandLow.multiply(long_1.fromNumber(10));
      significandLow = significandLow.add(long_1.fromNumber(digits[_dIdx2]));
    }
  }

  var significand = multiply64x2(significandHigh, long_1.fromString('100000000000000000'));
  significand.low = significand.low.add(significandLow);

  if (lessThan(significand.low, significandLow)) {
    significand.high = significand.high.add(long_1.fromNumber(1));
  } // Biased exponent


  biasedExponent = exponent + EXPONENT_BIAS;
  var dec = {
    low: long_1.fromNumber(0),
    high: long_1.fromNumber(0)
  }; // Encode combination, exponent, and significand.

  if (significand.high.shiftRightUnsigned(49).and(long_1.fromNumber(1)).equals(long_1.fromNumber(1))) {
    // Encode '11' into bits 1 to 3
    dec.high = dec.high.or(long_1.fromNumber(0x3).shiftLeft(61));
    dec.high = dec.high.or(long_1.fromNumber(biasedExponent).and(long_1.fromNumber(0x3fff).shiftLeft(47)));
    dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x7fffffffffff)));
  } else {
    dec.high = dec.high.or(long_1.fromNumber(biasedExponent & 0x3fff).shiftLeft(49));
    dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x1ffffffffffff)));
  }

  dec.low = significand.low; // Encode sign

  if (isNegative) {
    dec.high = dec.high.or(long_1.fromString('9223372036854775808'));
  } // Encode into a buffer


  var buffer$$1 = Buffer$2.alloc(16);
  index = 0; // Encode the low 64 bits of the decimal
  // Encode low bits

  buffer$$1[index++] = dec.low.low & 0xff;
  buffer$$1[index++] = dec.low.low >> 8 & 0xff;
  buffer$$1[index++] = dec.low.low >> 16 & 0xff;
  buffer$$1[index++] = dec.low.low >> 24 & 0xff; // Encode high bits

  buffer$$1[index++] = dec.low.high & 0xff;
  buffer$$1[index++] = dec.low.high >> 8 & 0xff;
  buffer$$1[index++] = dec.low.high >> 16 & 0xff;
  buffer$$1[index++] = dec.low.high >> 24 & 0xff; // Encode the high 64 bits of the decimal
  // Encode low bits

  buffer$$1[index++] = dec.high.low & 0xff;
  buffer$$1[index++] = dec.high.low >> 8 & 0xff;
  buffer$$1[index++] = dec.high.low >> 16 & 0xff;
  buffer$$1[index++] = dec.high.low >> 24 & 0xff; // Encode high bits

  buffer$$1[index++] = dec.high.high & 0xff;
  buffer$$1[index++] = dec.high.high >> 8 & 0xff;
  buffer$$1[index++] = dec.high.high >> 16 & 0xff;
  buffer$$1[index++] = dec.high.high >> 24 & 0xff; // Return the new Decimal128

  return new Decimal128(buffer$$1);
}; // Extract least significant 5 bits


var COMBINATION_MASK = 0x1f; // Extract least significant 14 bits

var EXPONENT_MASK = 0x3fff; // Value of combination field for Inf

var COMBINATION_INFINITY = 30; // Value of combination field for NaN

var COMBINATION_NAN = 31;
/**
 * Create a string representation of the raw Decimal128 value
 *
 * @method
 * @return {string} returns a Decimal128 string representation.
 */

Decimal128.prototype.toString = function () {
  // Note: bits in this routine are referred to starting at 0,
  // from the sign bit, towards the coefficient.
  // bits 0 - 31
  var high; // bits 32 - 63

  var midh; // bits 64 - 95

  var midl; // bits 96 - 127

  var low; // bits 1 - 5

  var combination; // decoded biased exponent (14 bits)

  var biased_exponent; // the number of significand digits

  var significand_digits = 0; // the base-10 digits in the significand

  var significand = new Array(36);

  for (var i = 0; i < significand.length; i++) {
    significand[i] = 0;
  } // read pointer into significand


  var index = 0; // unbiased exponent

  var exponent; // the exponent if scientific notation is used

  var scientific_exponent; // true if the number is zero

  var is_zero = false; // the most signifcant significand bits (50-46)

  var significand_msb; // temporary storage for significand decoding

  var significand128 = {
    parts: new Array(4)
  }; // indexing variables

  var j, k; // Output string

  var string = []; // Unpack index

  index = 0; // Buffer reference

  var buffer$$1 = this.bytes; // Unpack the low 64bits into a long

  low = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
  midl = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Unpack the high 64bits into a long

  midh = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
  high = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Unpack index

  index = 0; // Create the state of the decimal

  var dec = {
    low: new long_1(low, midl),
    high: new long_1(midh, high)
  };

  if (dec.high.lessThan(long_1.ZERO)) {
    string.push('-');
  } // Decode combination field and exponent


  combination = high >> 26 & COMBINATION_MASK;

  if (combination >> 3 === 3) {
    // Check for 'special' values
    if (combination === COMBINATION_INFINITY) {
      return string.join('') + 'Infinity';
    } else if (combination === COMBINATION_NAN) {
      return 'NaN';
    } else {
      biased_exponent = high >> 15 & EXPONENT_MASK;
      significand_msb = 0x08 + (high >> 14 & 0x01);
    }
  } else {
    significand_msb = high >> 14 & 0x07;
    biased_exponent = high >> 17 & EXPONENT_MASK;
  }

  exponent = biased_exponent - EXPONENT_BIAS; // Create string of significand digits
  // Convert the 114-bit binary number represented by
  // (significand_high, significand_low) to at most 34 decimal
  // digits through modulo and division.

  significand128.parts[0] = (high & 0x3fff) + ((significand_msb & 0xf) << 14);
  significand128.parts[1] = midh;
  significand128.parts[2] = midl;
  significand128.parts[3] = low;

  if (significand128.parts[0] === 0 && significand128.parts[1] === 0 && significand128.parts[2] === 0 && significand128.parts[3] === 0) {
    is_zero = true;
  } else {
    for (k = 3; k >= 0; k--) {
      var least_digits = 0; // Peform the divide

      var result = divideu128(significand128);
      significand128 = result.quotient;
      least_digits = result.rem.low; // We now have the 9 least significant digits (in base 2).
      // Convert and output to string.

      if (!least_digits) continue;

      for (j = 8; j >= 0; j--) {
        // significand[k * 9 + j] = Math.round(least_digits % 10);
        significand[k * 9 + j] = least_digits % 10; // least_digits = Math.round(least_digits / 10);

        least_digits = Math.floor(least_digits / 10);
      }
    }
  } // Output format options:
  // Scientific - [-]d.dddE(+/-)dd or [-]dE(+/-)dd
  // Regular    - ddd.ddd


  if (is_zero) {
    significand_digits = 1;
    significand[index] = 0;
  } else {
    significand_digits = 36;

    while (!significand[index]) {
      significand_digits = significand_digits - 1;
      index = index + 1;
    }
  }

  scientific_exponent = significand_digits - 1 + exponent; // The scientific exponent checks are dictated by the string conversion
  // specification and are somewhat arbitrary cutoffs.
  //
  // We must check exponent > 0, because if this is the case, the number
  // has trailing zeros.  However, we *cannot* output these trailing zeros,
  // because doing so would change the precision of the value, and would
  // change stored data if the string converted number is round tripped.

  if (scientific_exponent >= 34 || scientific_exponent <= -7 || exponent > 0) {
    // Scientific format
    // if there are too many significant digits, we should just be treating numbers
    // as + or - 0 and using the non-scientific exponent (this is for the "invalid
    // representation should be treated as 0/-0" spec cases in decimal128-1.json)
    if (significand_digits > 34) {
      string.push(0);
      if (exponent > 0) string.push('E+' + exponent);else if (exponent < 0) string.push('E' + exponent);
      return string.join('');
    }

    string.push(significand[index++]);
    significand_digits = significand_digits - 1;

    if (significand_digits) {
      string.push('.');
    }

    for (var _i = 0; _i < significand_digits; _i++) {
      string.push(significand[index++]);
    } // Exponent


    string.push('E');

    if (scientific_exponent > 0) {
      string.push('+' + scientific_exponent);
    } else {
      string.push(scientific_exponent);
    }
  } else {
    // Regular format with no decimal place
    if (exponent >= 0) {
      for (var _i2 = 0; _i2 < significand_digits; _i2++) {
        string.push(significand[index++]);
      }
    } else {
      var radix_position = significand_digits + exponent; // non-zero digits before radix

      if (radix_position > 0) {
        for (var _i3 = 0; _i3 < radix_position; _i3++) {
          string.push(significand[index++]);
        }
      } else {
        string.push('0');
      }

      string.push('.'); // add leading zeros after radix

      while (radix_position++ < 0) {
        string.push('0');
      }

      for (var _i4 = 0; _i4 < significand_digits - Math.max(radix_position - 1, 0); _i4++) {
        string.push(significand[index++]);
      }
    }
  }

  return string.join('');
};

Decimal128.prototype.toJSON = function () {
  return {
    $numberDecimal: this.toString()
  };
};
/**
 * @ignore
 */


Decimal128.prototype.toExtendedJSON = function () {
  return {
    $numberDecimal: this.toString()
  };
};
/**
 * @ignore
 */


Decimal128.fromExtendedJSON = function (doc) {
  return Decimal128.fromString(doc.$numberDecimal);
};

Object.defineProperty(Decimal128.prototype, '_bsontype', {
  value: 'Decimal128'
});
var decimal128 = Decimal128;

/**
 * A class representation of the BSON MinKey type.
 */

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$7(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$7(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$7(Constructor.prototype, protoProps); if (staticProps) _defineProperties$7(Constructor, staticProps); return Constructor; }

var MinKey =
/*#__PURE__*/
function () {
  /**
   * Create a MinKey type
   *
   * @return {MinKey} A MinKey instance
   */
  function MinKey() {
    _classCallCheck$7(this, MinKey);
  }
  /**
   * @ignore
   */


  _createClass$7(MinKey, [{
    key: "toExtendedJSON",
    value: function toExtendedJSON() {
      return {
        $minKey: 1
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON() {
      return new MinKey();
    }
  }]);

  return MinKey;
}();

Object.defineProperty(MinKey.prototype, '_bsontype', {
  value: 'MinKey'
});
var min_key = MinKey;

/**
 * A class representation of the BSON MaxKey type.
 */

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$8(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$8(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$8(Constructor.prototype, protoProps); if (staticProps) _defineProperties$8(Constructor, staticProps); return Constructor; }

var MaxKey =
/*#__PURE__*/
function () {
  /**
   * Create a MaxKey type
   *
   * @return {MaxKey} A MaxKey instance
   */
  function MaxKey() {
    _classCallCheck$8(this, MaxKey);
  }
  /**
   * @ignore
   */


  _createClass$8(MaxKey, [{
    key: "toExtendedJSON",
    value: function toExtendedJSON() {
      return {
        $maxKey: 1
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON() {
      return new MaxKey();
    }
  }]);

  return MaxKey;
}();

Object.defineProperty(MaxKey.prototype, '_bsontype', {
  value: 'MaxKey'
});
var max_key = MaxKey;

/**
 * A class representation of the BSON DBRef type.
 */

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$9(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$9(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$9(Constructor.prototype, protoProps); if (staticProps) _defineProperties$9(Constructor, staticProps); return Constructor; }

var DBRef =
/*#__PURE__*/
function () {
  /**
   * Create a DBRef type
   *
   * @param {string} collection the collection name.
   * @param {ObjectId} oid the reference ObjectId.
   * @param {string} [db] optional db name, if omitted the reference is local to the current db.
   * @return {DBRef}
   */
  function DBRef(collection, oid, db, fields) {
    _classCallCheck$9(this, DBRef);

    // check if namespace has been provided
    var parts = collection.split('.');

    if (parts.length === 2) {
      db = parts.shift();
      collection = parts.shift();
    }

    this.collection = collection;
    this.oid = oid;
    this.db = db;
    this.fields = fields || {};
  }
  /**
   * @ignore
   * @api private
   */


  _createClass$9(DBRef, [{
    key: "toJSON",
    value: function toJSON() {
      var o = Object.assign({
        $ref: this.collection,
        $id: this.oid
      }, this.fields);
      if (this.db != null) o.$db = this.db;
      return o;
    }
    /**
     * @ignore
     */

  }, {
    key: "toExtendedJSON",
    value: function toExtendedJSON() {
      var o = {
        $ref: this.collection,
        $id: this.oid
      };
      if (this.db) o.$db = this.db;
      o = Object.assign(o, this.fields);
      return o;
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc) {
      var copy = Object.assign({}, doc);
      ['$ref', '$id', '$db'].forEach(function (k) {
        return delete copy[k];
      });
      return new DBRef(doc.$ref, doc.$id, doc.$db, copy);
    }
  }]);

  return DBRef;
}();

Object.defineProperty(DBRef.prototype, '_bsontype', {
  value: 'DBRef'
}); // the 1.x parser used a "namespace" property, while 4.x uses "collection". To ensure backwards
// compatibility, let's expose "namespace"

Object.defineProperty(DBRef.prototype, 'namespace', {
  get: function get() {
    return this.collection;
  },
  set: function set(val) {
    this.collection = val;
  },
  configurable: false
});
var db_ref = DBRef;

function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$a(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$a(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$a(Constructor.prototype, protoProps); if (staticProps) _defineProperties$a(Constructor, staticProps); return Constructor; }

var Buffer$3 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer;
/**
 * A class representation of the BSON Binary type.
 */

var Binary =
/*#__PURE__*/
function () {
  /**
   * Create a Binary type
   *
   * Sub types
   *  - **BSON.BSON_BINARY_SUBTYPE_DEFAULT**, default BSON type.
   *  - **BSON.BSON_BINARY_SUBTYPE_FUNCTION**, BSON function type.
   *  - **BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY**, BSON byte array type.
   *  - **BSON.BSON_BINARY_SUBTYPE_UUID**, BSON uuid type.
   *  - **BSON.BSON_BINARY_SUBTYPE_MD5**, BSON md5 type.
   *  - **BSON.BSON_BINARY_SUBTYPE_USER_DEFINED**, BSON user defined type.
   *
   * @param {Buffer} buffer a buffer object containing the binary data.
   * @param {Number} [subType] the option binary type.
   * @return {Binary}
   */
  function Binary(buffer$$1, subType) {
    _classCallCheck$a(this, Binary);

    if (buffer$$1 != null && !(typeof buffer$$1 === 'string') && !Buffer$3.isBuffer(buffer$$1) && !(buffer$$1 instanceof Uint8Array) && !Array.isArray(buffer$$1)) {
      throw new TypeError('only String, Buffer, Uint8Array or Array accepted');
    }

    this.sub_type = subType == null ? BSON_BINARY_SUBTYPE_DEFAULT : subType;
    this.position = 0;

    if (buffer$$1 != null && !(buffer$$1 instanceof Number)) {
      // Only accept Buffer, Uint8Array or Arrays
      if (typeof buffer$$1 === 'string') {
        // Different ways of writing the length of the string for the different types
        if (typeof Buffer$3 !== 'undefined') {
          this.buffer = Buffer$3.from(buffer$$1);
        } else if (typeof Uint8Array !== 'undefined' || Array.isArray(buffer$$1)) {
          this.buffer = writeStringToArray(buffer$$1);
        } else {
          throw new TypeError('only String, Buffer, Uint8Array or Array accepted');
        }
      } else {
        this.buffer = buffer$$1;
      }

      this.position = buffer$$1.length;
    } else {
      if (typeof Buffer$3 !== 'undefined') {
        this.buffer = Buffer$3.alloc(Binary.BUFFER_SIZE);
      } else if (typeof Uint8Array !== 'undefined') {
        this.buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE));
      } else {
        this.buffer = new Array(Binary.BUFFER_SIZE);
      }
    }
  }
  /**
   * Updates this binary with byte_value.
   *
   * @method
   * @param {string} byte_value a single byte we wish to write.
   */


  _createClass$a(Binary, [{
    key: "put",
    value: function put(byte_value) {
      // If it's a string and a has more than one character throw an error
      if (byte_value['length'] != null && typeof byte_value !== 'number' && byte_value.length !== 1) throw new TypeError('only accepts single character String, Uint8Array or Array');
      if (typeof byte_value !== 'number' && byte_value < 0 || byte_value > 255) throw new TypeError('only accepts number in a valid unsigned byte range 0-255'); // Decode the byte value once

      var decoded_byte = null;

      if (typeof byte_value === 'string') {
        decoded_byte = byte_value.charCodeAt(0);
      } else if (byte_value['length'] != null) {
        decoded_byte = byte_value[0];
      } else {
        decoded_byte = byte_value;
      }

      if (this.buffer.length > this.position) {
        this.buffer[this.position++] = decoded_byte;
      } else {
        if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
          // Create additional overflow buffer
          var buffer$$1 = Buffer$3.alloc(Binary.BUFFER_SIZE + this.buffer.length); // Combine the two buffers together

          this.buffer.copy(buffer$$1, 0, 0, this.buffer.length);
          this.buffer = buffer$$1;
          this.buffer[this.position++] = decoded_byte;
        } else {
          var _buffer = null; // Create a new buffer (typed or normal array)

          if (isUint8Array(this.buffer)) {
            _buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE + this.buffer.length));
          } else {
            _buffer = new Array(Binary.BUFFER_SIZE + this.buffer.length);
          } // We need to copy all the content to the new array


          for (var i = 0; i < this.buffer.length; i++) {
            _buffer[i] = this.buffer[i];
          } // Reassign the buffer


          this.buffer = _buffer; // Write the byte

          this.buffer[this.position++] = decoded_byte;
        }
      }
    }
    /**
     * Writes a buffer or string to the binary.
     *
     * @method
     * @param {(Buffer|string)} string a string or buffer to be written to the Binary BSON object.
     * @param {number} offset specify the binary of where to write the content.
     * @return {null}
     */

  }, {
    key: "write",
    value: function write(string, offset) {
      offset = typeof offset === 'number' ? offset : this.position; // If the buffer is to small let's extend the buffer

      if (this.buffer.length < offset + string.length) {
        var buffer$$1 = null; // If we are in node.js

        if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
          buffer$$1 = Buffer$3.alloc(this.buffer.length + string.length);
          this.buffer.copy(buffer$$1, 0, 0, this.buffer.length);
        } else if (isUint8Array(this.buffer)) {
          // Create a new buffer
          buffer$$1 = new Uint8Array(new ArrayBuffer(this.buffer.length + string.length)); // Copy the content

          for (var i = 0; i < this.position; i++) {
            buffer$$1[i] = this.buffer[i];
          }
        } // Assign the new buffer


        this.buffer = buffer$$1;
      }

      if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(string) && Buffer$3.isBuffer(this.buffer)) {
        string.copy(this.buffer, offset, 0, string.length);
        this.position = offset + string.length > this.position ? offset + string.length : this.position; // offset = string.length
      } else if (typeof Buffer$3 !== 'undefined' && typeof string === 'string' && Buffer$3.isBuffer(this.buffer)) {
        this.buffer.write(string, offset, 'binary');
        this.position = offset + string.length > this.position ? offset + string.length : this.position; // offset = string.length;
      } else if (isUint8Array(string) || Array.isArray(string) && typeof string !== 'string') {
        for (var _i = 0; _i < string.length; _i++) {
          this.buffer[offset++] = string[_i];
        }

        this.position = offset > this.position ? offset : this.position;
      } else if (typeof string === 'string') {
        for (var _i2 = 0; _i2 < string.length; _i2++) {
          this.buffer[offset++] = string.charCodeAt(_i2);
        }

        this.position = offset > this.position ? offset : this.position;
      }
    }
    /**
     * Reads **length** bytes starting at **position**.
     *
     * @method
     * @param {number} position read from the given position in the Binary.
     * @param {number} length the number of bytes to read.
     * @return {Buffer}
     */

  }, {
    key: "read",
    value: function read(position, length) {
      length = length && length > 0 ? length : this.position; // Let's return the data based on the type we have

      if (this.buffer['slice']) {
        return this.buffer.slice(position, position + length);
      } // Create a buffer to keep the result


      var buffer$$1 = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(length)) : new Array(length);

      for (var i = 0; i < length; i++) {
        buffer$$1[i] = this.buffer[position++];
      } // Return the buffer


      return buffer$$1;
    }
    /**
     * Returns the value of this binary as a string.
     *
     * @method
     * @return {string}
     */

  }, {
    key: "value",
    value: function value(asRaw) {
      asRaw = asRaw == null ? false : asRaw; // Optimize to serialize for the situation where the data == size of buffer

      if (asRaw && typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer; // If it's a node.js buffer object

      if (typeof Buffer$3 !== 'undefined' && Buffer$3.isBuffer(this.buffer)) {
        return asRaw ? this.buffer.slice(0, this.position) : this.buffer.toString('binary', 0, this.position);
      } else {
        if (asRaw) {
          // we support the slice command use it
          if (this.buffer['slice'] != null) {
            return this.buffer.slice(0, this.position);
          } else {
            // Create a new buffer to copy content to
            var newBuffer = isUint8Array(this.buffer) ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position); // Copy content

            for (var i = 0; i < this.position; i++) {
              newBuffer[i] = this.buffer[i];
            } // Return the buffer


            return newBuffer;
          }
        } else {
          return convertArraytoUtf8BinaryString(this.buffer, 0, this.position);
        }
      }
    }
    /**
     * Length.
     *
     * @method
     * @return {number} the length of the binary.
     */

  }, {
    key: "length",
    value: function length() {
      return this.position;
    }
    /**
     * @ignore
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.buffer != null ? this.buffer.toString('base64') : '';
    }
    /**
     * @ignore
     */

  }, {
    key: "toString",
    value: function toString(format) {
      return this.buffer != null ? this.buffer.slice(0, this.position).toString(format) : '';
    }
    /**
     * @ignore
     */

  }, {
    key: "toExtendedJSON",
    value: function toExtendedJSON() {
      var base64String = Buffer$3.isBuffer(this.buffer) ? this.buffer.toString('base64') : Buffer$3.from(this.buffer).toString('base64');
      var subType = Number(this.sub_type).toString(16);
      return {
        $binary: {
          base64: base64String,
          subType: subType.length === 1 ? '0' + subType : subType
        }
      };
    }
    /**
     * @ignore
     */

  }], [{
    key: "fromExtendedJSON",
    value: function fromExtendedJSON(doc) {
      var type = doc.$binary.subType ? parseInt(doc.$binary.subType, 16) : 0;
      var data = Buffer$3.from(doc.$binary.base64, 'base64');
      return new Binary(data, type);
    }
  }]);

  return Binary;
}();
/**
 * Binary default subtype
 * @ignore
 */


var BSON_BINARY_SUBTYPE_DEFAULT = 0;

function isUint8Array(obj) {
  return Object.prototype.toString.call(obj) === '[object Uint8Array]';
}
/**
 * @ignore
 */


function writeStringToArray(data) {
  // Create a buffer
  var buffer$$1 = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(data.length)) : new Array(data.length); // Write the content to the buffer

  for (var i = 0; i < data.length; i++) {
    buffer$$1[i] = data.charCodeAt(i);
  } // Write the string to the buffer


  return buffer$$1;
}
/**
 * Convert Array ot Uint8Array to Binary String
 *
 * @ignore
 */


function convertArraytoUtf8BinaryString(byteArray, startIndex, endIndex) {
  var result = '';

  for (var i = startIndex; i < endIndex; i++) {
    result = result + String.fromCharCode(byteArray[i]);
  }

  return result;
}

Binary.BUFFER_SIZE = 256;
/**
 * Default BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/

Binary.SUBTYPE_DEFAULT = 0;
/**
 * Function BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/

Binary.SUBTYPE_FUNCTION = 1;
/**
 * Byte Array BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/

Binary.SUBTYPE_BYTE_ARRAY = 2;
/**
 * OLD UUID BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/

Binary.SUBTYPE_UUID_OLD = 3;
/**
 * UUID BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/

Binary.SUBTYPE_UUID = 4;
/**
 * MD5 BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/

Binary.SUBTYPE_MD5 = 5;
/**
 * User BSON type
 *
 * @classconstant SUBTYPE_DEFAULT
 **/

Binary.SUBTYPE_USER_DEFINED = 128;
Object.defineProperty(Binary.prototype, '_bsontype', {
  value: 'Binary'
});
var binary = Binary;

var constants = {
  // BSON MAX VALUES
  BSON_INT32_MAX: 0x7fffffff,
  BSON_INT32_MIN: -0x80000000,
  BSON_INT64_MAX: Math.pow(2, 63) - 1,
  BSON_INT64_MIN: -Math.pow(2, 63),
  // JS MAX PRECISE VALUES
  JS_INT_MAX: 0x20000000000000,
  // Any integer up to 2^53 can be precisely represented by a double.
  JS_INT_MIN: -0x20000000000000,
  // Any integer down to -2^53 can be precisely represented by a double.

  /**
   * Number BSON Type
   *
   * @classconstant BSON_DATA_NUMBER
   **/
  BSON_DATA_NUMBER: 1,

  /**
   * String BSON Type
   *
   * @classconstant BSON_DATA_STRING
   **/
  BSON_DATA_STRING: 2,

  /**
   * Object BSON Type
   *
   * @classconstant BSON_DATA_OBJECT
   **/
  BSON_DATA_OBJECT: 3,

  /**
   * Array BSON Type
   *
   * @classconstant BSON_DATA_ARRAY
   **/
  BSON_DATA_ARRAY: 4,

  /**
   * Binary BSON Type
   *
   * @classconstant BSON_DATA_BINARY
   **/
  BSON_DATA_BINARY: 5,

  /**
   * Binary BSON Type
   *
   * @classconstant BSON_DATA_UNDEFINED
   **/
  BSON_DATA_UNDEFINED: 6,

  /**
   * ObjectId BSON Type
   *
   * @classconstant BSON_DATA_OID
   **/
  BSON_DATA_OID: 7,

  /**
   * Boolean BSON Type
   *
   * @classconstant BSON_DATA_BOOLEAN
   **/
  BSON_DATA_BOOLEAN: 8,

  /**
   * Date BSON Type
   *
   * @classconstant BSON_DATA_DATE
   **/
  BSON_DATA_DATE: 9,

  /**
   * null BSON Type
   *
   * @classconstant BSON_DATA_NULL
   **/
  BSON_DATA_NULL: 10,

  /**
   * RegExp BSON Type
   *
   * @classconstant BSON_DATA_REGEXP
   **/
  BSON_DATA_REGEXP: 11,

  /**
   * Code BSON Type
   *
   * @classconstant BSON_DATA_DBPOINTER
   **/
  BSON_DATA_DBPOINTER: 12,

  /**
   * Code BSON Type
   *
   * @classconstant BSON_DATA_CODE
   **/
  BSON_DATA_CODE: 13,

  /**
   * Symbol BSON Type
   *
   * @classconstant BSON_DATA_SYMBOL
   **/
  BSON_DATA_SYMBOL: 14,

  /**
   * Code with Scope BSON Type
   *
   * @classconstant BSON_DATA_CODE_W_SCOPE
   **/
  BSON_DATA_CODE_W_SCOPE: 15,

  /**
   * 32 bit Integer BSON Type
   *
   * @classconstant BSON_DATA_INT
   **/
  BSON_DATA_INT: 16,

  /**
   * Timestamp BSON Type
   *
   * @classconstant BSON_DATA_TIMESTAMP
   **/
  BSON_DATA_TIMESTAMP: 17,

  /**
   * Long BSON Type
   *
   * @classconstant BSON_DATA_LONG
   **/
  BSON_DATA_LONG: 18,

  /**
   * Long BSON Type
   *
   * @classconstant BSON_DATA_DECIMAL128
   **/
  BSON_DATA_DECIMAL128: 19,

  /**
   * MinKey BSON Type
   *
   * @classconstant BSON_DATA_MIN_KEY
   **/
  BSON_DATA_MIN_KEY: 0xff,

  /**
   * MaxKey BSON Type
   *
   * @classconstant BSON_DATA_MAX_KEY
   **/
  BSON_DATA_MAX_KEY: 0x7f,

  /**
   * Binary Default Type
   *
   * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
   **/
  BSON_BINARY_SUBTYPE_DEFAULT: 0,

  /**
   * Binary Function Type
   *
   * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
   **/
  BSON_BINARY_SUBTYPE_FUNCTION: 1,

  /**
   * Binary Byte Array Type
   *
   * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
   **/
  BSON_BINARY_SUBTYPE_BYTE_ARRAY: 2,

  /**
   * Binary UUID Type
   *
   * @classconstant BSON_BINARY_SUBTYPE_UUID
   **/
  BSON_BINARY_SUBTYPE_UUID: 3,

  /**
   * Binary MD5 Type
   *
   * @classconstant BSON_BINARY_SUBTYPE_MD5
   **/
  BSON_BINARY_SUBTYPE_MD5: 4,

  /**
   * Binary User Defined Type
   *
   * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
   **/
  BSON_BINARY_SUBTYPE_USER_DEFINED: 128
};

function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
// const Map = require('./map');

/**
 * @namespace EJSON
 */
// all the types where we don't need to do any special processing and can just pass the EJSON
//straight to type.fromExtendedJSON


var keysToCodecs = {
  $oid: objectid,
  $binary: binary,
  $symbol: symbol,
  $numberInt: int_32,
  $numberDecimal: decimal128,
  $numberDouble: double_1,
  $numberLong: long_1,
  $minKey: min_key,
  $maxKey: max_key,
  $regularExpression: regexp,
  $timestamp: timestamp
};

function deserializeValue(self, key, value, options) {
  if (typeof value === 'number') {
    if (options.relaxed) {
      return value;
    } // if it's an integer, should interpret as smallest BSON integer
    // that can represent it exactly. (if out of range, interpret as double.)


    if (Math.floor(value) === value) {
      if (value >= BSON_INT32_MIN && value <= BSON_INT32_MAX) return new int_32(value);
      if (value >= BSON_INT64_MIN && value <= BSON_INT64_MAX) return new long_1.fromNumber(value);
    } // If the number is a non-integer or out of integer range, should interpret as BSON Double.


    return new double_1(value);
  } // from here on out we're looking for bson types, so bail if its not an object


  if (value == null || _typeof$2(value) !== 'object') return value; // upgrade deprecated undefined to null

  if (value.$undefined) return null;
  var keys = Object.keys(value).filter(function (k) {
    return k.startsWith('$') && value[k] != null;
  });

  for (var i = 0; i < keys.length; i++) {
    var c = keysToCodecs[keys[i]];
    if (c) return c.fromExtendedJSON(value, options);
  }

  if (value.$date != null) {
    var d = value.$date;
    var date = new Date();
    if (typeof d === 'string') date.setTime(Date.parse(d));else if (long_1.isLong(d)) date.setTime(d.toNumber());else if (typeof d === 'number' && options.relaxed) date.setTime(d);
    return date;
  }

  if (value.$code != null) {
    var copy = Object.assign({}, value);

    if (value.$scope) {
      copy.$scope = deserializeValue(self, null, value.$scope);
    }

    return code.fromExtendedJSON(value);
  }

  if (value.$ref != null || value.$dbPointer != null) {
    var v = value.$ref ? value : value.$dbPointer; // we run into this in a "degenerate EJSON" case (with $id and $ref order flipped)
    // because of the order JSON.parse goes through the document

    if (v instanceof db_ref) return v;
    var dollarKeys = Object.keys(v).filter(function (k) {
      return k.startsWith('$');
    });
    var valid = true;
    dollarKeys.forEach(function (k) {
      if (['$ref', '$id', '$db'].indexOf(k) === -1) valid = false;
    }); // only make DBRef if $ keys are all valid

    if (valid) return db_ref.fromExtendedJSON(v);
  }

  return value;
}
/**
 * Parse an Extended JSON string, constructing the JavaScript value or object described by that
 * string.
 *
 * @memberof EJSON
 * @param {string} text
 * @param {object} [options] Optional settings
 * @param {boolean} [options.relaxed=true] Attempt to return native JS types where possible, rather than BSON types (if true)
 * @return {object}
 *
 * @example
 * const { EJSON } = require('bson');
 * const text = '{ "int32": { "$numberInt": "10" } }';
 *
 * // prints { int32: { [String: '10'] _bsontype: 'Int32', value: '10' } }
 * console.log(EJSON.parse(text, { relaxed: false }));
 *
 * // prints { int32: 10 }
 * console.log(EJSON.parse(text));
 */


function parse(text, options) {
  var _this = this;

  options = Object.assign({}, {
    relaxed: true
  }, options); // relaxed implies not strict

  if (typeof options.relaxed === 'boolean') options.strict = !options.relaxed;
  if (typeof options.strict === 'boolean') options.relaxed = !options.strict;
  return JSON.parse(text, function (key, value) {
    return deserializeValue(_this, key, value, options);
  });
} //
// Serializer
//
// MAX INT32 boundaries


var BSON_INT32_MAX = 0x7fffffff,
    BSON_INT32_MIN = -0x80000000,
    BSON_INT64_MAX = 0x7fffffffffffffff,
    BSON_INT64_MIN = -0x8000000000000000;
/**
 * Converts a BSON document to an Extended JSON string, optionally replacing values if a replacer
 * function is specified or optionally including only the specified properties if a replacer array
 * is specified.
 *
 * @memberof EJSON
 * @param {object} value The value to convert to extended JSON
 * @param {function|array} [replacer] A function that alters the behavior of the stringification process, or an array of String and Number objects that serve as a whitelist for selecting/filtering the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string
 * @param {string|number} [space] A String or Number object that's used to insert white space into the output JSON string for readability purposes.
 * @param {object} [options] Optional settings
 * @param {boolean} [options.relaxed=true] Enabled Extended JSON's `relaxed` mode
 * @returns {string}
 *
 * @example
 * const { EJSON } = require('bson');
 * const Int32 = require('mongodb').Int32;
 * const doc = { int32: new Int32(10) };
 *
 * // prints '{"int32":{"$numberInt":"10"}}'
 * console.log(EJSON.stringify(doc, { relaxed: false }));
 *
 * // prints '{"int32":10}'
 * console.log(EJSON.stringify(doc));
 */

function stringify(value, replacer, space, options) {
  if (space != null && _typeof$2(space) === 'object') {
    options = space;
    space = 0;
  }

  if (replacer != null && _typeof$2(replacer) === 'object' && !Array.isArray(replacer)) {
    options = replacer;
    replacer = null;
    space = 0;
  }

  options = Object.assign({}, {
    relaxed: true
  }, options);
  var doc = Array.isArray(value) ? serializeArray(value, options) : serializeDocument(value, options);
  return JSON.stringify(doc, replacer, space);
}
/**
 * Serializes an object to an Extended JSON string, and reparse it as a JavaScript object.
 *
 * @memberof EJSON
 * @param {object} bson The object to serialize
 * @param {object} [options] Optional settings passed to the `stringify` function
 * @return {object}
 */


function serialize(bson, options) {
  options = options || {};
  return JSON.parse(stringify(bson, options));
}
/**
 * Deserializes an Extended JSON object into a plain JavaScript object with native/BSON types
 *
 * @memberof EJSON
 * @param {object} ejson The Extended JSON object to deserialize
 * @param {object} [options] Optional settings passed to the parse method
 * @return {object}
 */


function deserialize(ejson, options) {
  options = options || {};
  return parse(JSON.stringify(ejson), options);
}

function serializeArray(array, options) {
  return array.map(function (v) {
    return serializeValue(v, options);
  });
}

function getISOString(date) {
  var isoStr = date.toISOString(); // we should only show milliseconds in timestamp if they're non-zero

  return date.getUTCMilliseconds() !== 0 ? isoStr : isoStr.slice(0, -5) + 'Z';
}

function serializeValue(value, options) {
  if (Array.isArray(value)) return serializeArray(value, options);
  if (value === undefined) return null;

  if (value instanceof Date) {
    var dateNum = value.getTime(),
        // is it in year range 1970-9999?
    inRange = dateNum > -1 && dateNum < 253402318800000;
    return options.relaxed && inRange ? {
      $date: getISOString(value)
    } : {
      $date: {
        $numberLong: value.getTime().toString()
      }
    };
  }

  if (typeof value === 'number' && !options.relaxed) {
    // it's an integer
    if (Math.floor(value) === value) {
      var int32Range = value >= BSON_INT32_MIN && value <= BSON_INT32_MAX,
          int64Range = value >= BSON_INT64_MIN && value <= BSON_INT64_MAX; // interpret as being of the smallest BSON integer type that can represent the number exactly

      if (int32Range) return {
        $numberInt: value.toString()
      };
      if (int64Range) return {
        $numberLong: value.toString()
      };
    }

    return {
      $numberDouble: value.toString()
    };
  }

  if (value instanceof RegExp) {
    var flags = value.flags;

    if (flags === undefined) {
      flags = value.toString().match(/[gimuy]*$/)[0];
    }

    var rx = new regexp(value.source, flags);
    return rx.toExtendedJSON();
  }

  if (value != null && _typeof$2(value) === 'object') return serializeDocument(value, options);
  return value;
}

var BSON_TYPE_MAPPINGS = {
  Binary: function Binary(o) {
    return new binary(o.value(), o.subtype);
  },
  Code: function Code(o) {
    return new code(o.code, o.scope);
  },
  DBRef: function DBRef(o) {
    return new db_ref(o.collection || o.namespace, o.oid, o.db, o.fields);
  },
  // "namespace" for 1.x library backwards compat
  Decimal128: function Decimal128(o) {
    return new decimal128(o.bytes);
  },
  Double: function Double(o) {
    return new double_1(o.value);
  },
  Int32: function Int32(o) {
    return new int_32(o.value);
  },
  Long: function Long(o) {
    return long_1.fromBits( // underscore variants for 1.x backwards compatibility
    o.low != null ? o.low : o.low_, o.low != null ? o.high : o.high_, o.low != null ? o.unsigned : o.unsigned_);
  },
  MaxKey: function MaxKey() {
    return new max_key();
  },
  MinKey: function MinKey() {
    return new min_key();
  },
  ObjectID: function ObjectID(o) {
    return new objectid(o);
  },
  ObjectId: function ObjectId(o) {
    return new objectid(o);
  },
  // support 4.0.0/4.0.1 before _bsontype was reverted back to ObjectID
  BSONRegExp: function BSONRegExp(o) {
    return new regexp(o.pattern, o.options);
  },
  Symbol: function Symbol(o) {
    return new symbol(o.value);
  },
  Timestamp: function Timestamp(o) {
    return timestamp.fromBits(o.low, o.high);
  }
};

function serializeDocument(doc, options) {
  if (doc == null || _typeof$2(doc) !== 'object') throw new Error('not an object instance');
  var bsontype = doc._bsontype;

  if (typeof bsontype === 'undefined') {
    // It's a regular object. Recursively serialize its property values.
    var _doc = {};

    for (var name in doc) {
      _doc[name] = serializeValue(doc[name], options);
    }

    return _doc;
  } else if (typeof bsontype === 'string') {
    // the "document" is really just a BSON type object
    var _doc2 = doc;

    if (typeof _doc2.toExtendedJSON !== 'function') {
      // There's no EJSON serialization function on the object. It's probably an
      // object created by a previous version of this library (or another library)
      // that's duck-typing objects to look like they were generated by this library).
      // Copy the object into this library's version of that type.
      var mapper = BSON_TYPE_MAPPINGS[bsontype];

      if (!mapper) {
        throw new TypeError('Unrecognized or invalid _bsontype: ' + bsontype);
      }

      _doc2 = mapper(_doc2);
    } // Two BSON types may have nested objects that may need to be serialized too


    if (bsontype === 'Code' && _doc2.scope) {
      _doc2 = new code(_doc2.code, serializeValue(_doc2.scope, options));
    } else if (bsontype === 'DBRef' && _doc2.oid) {
      _doc2 = new db_ref(_doc2.collection, serializeValue(_doc2.oid, options), _doc2.db, _doc2.fields);
    }

    return _doc2.toExtendedJSON(options);
  } else {
    throw new Error('_bsontype must be a string, but was: ' + _typeof$2(bsontype));
  }
}

var extended_json = {
  parse: parse,
  deserialize: deserialize,
  serialize: serialize,
  stringify: stringify
};

var FIRST_BIT = 0x80;
var FIRST_TWO_BITS = 0xc0;
var FIRST_THREE_BITS = 0xe0;
var FIRST_FOUR_BITS = 0xf0;
var FIRST_FIVE_BITS = 0xf8;
var TWO_BIT_CHAR = 0xc0;
var THREE_BIT_CHAR = 0xe0;
var FOUR_BIT_CHAR = 0xf0;
var CONTINUING_CHAR = 0x80;
/**
 * Determines if the passed in bytes are valid utf8
 * @param {Buffer|Uint8Array} bytes An array of 8-bit bytes. Must be indexable and have length property
 * @param {Number} start The index to start validating
 * @param {Number} end The index to end validating
 * @returns {boolean} True if valid utf8
 */

function validateUtf8(bytes, start, end) {
  var continuation = 0;

  for (var i = start; i < end; i += 1) {
    var byte = bytes[i];

    if (continuation) {
      if ((byte & FIRST_TWO_BITS) !== CONTINUING_CHAR) {
        return false;
      }

      continuation -= 1;
    } else if (byte & FIRST_BIT) {
      if ((byte & FIRST_THREE_BITS) === TWO_BIT_CHAR) {
        continuation = 1;
      } else if ((byte & FIRST_FOUR_BITS) === THREE_BIT_CHAR) {
        continuation = 2;
      } else if ((byte & FIRST_FIVE_BITS) === FOUR_BIT_CHAR) {
        continuation = 3;
      } else {
        return false;
      }
    }
  }

  return !continuation;
}

var validateUtf8_1 = validateUtf8;
var validate_utf8 = {
  validateUtf8: validateUtf8_1
};

var Buffer$4 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer;
var validateUtf8$1 = validate_utf8.validateUtf8; // Internal long versions

var JS_INT_MAX_LONG = long_1.fromNumber(constants.JS_INT_MAX);
var JS_INT_MIN_LONG = long_1.fromNumber(constants.JS_INT_MIN);
var functionCache = {};

function deserialize$1(buffer$$1, options, isArray) {
  options = options == null ? {} : options;
  var index = options && options.index ? options.index : 0; // Read the document size

  var size = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24;

  if (size < 5) {
    throw new Error("bson size must be >= 5, is ".concat(size));
  }

  if (options.allowObjectSmallerThanBufferSize && buffer$$1.length < size) {
    throw new Error("buffer length ".concat(buffer$$1.length, " must be >= bson size ").concat(size));
  }

  if (!options.allowObjectSmallerThanBufferSize && buffer$$1.length !== size) {
    throw new Error("buffer length ".concat(buffer$$1.length, " must === bson size ").concat(size));
  }

  if (size + index > buffer$$1.length) {
    throw new Error("(bson size ".concat(size, " + options.index ").concat(index, " must be <= buffer length ").concat(Buffer$4.byteLength(buffer$$1), ")"));
  } // Illegal end value


  if (buffer$$1[index + size - 1] !== 0) {
    throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
  } // Start deserializtion


  return deserializeObject(buffer$$1, index, options, isArray);
}

function deserializeObject(buffer$$1, index, options, isArray) {
  var evalFunctions = options['evalFunctions'] == null ? false : options['evalFunctions'];
  var cacheFunctions = options['cacheFunctions'] == null ? false : options['cacheFunctions'];
  var cacheFunctionsCrc32 = options['cacheFunctionsCrc32'] == null ? false : options['cacheFunctionsCrc32'];
  if (!cacheFunctionsCrc32) var crc32 = null;
  var fieldsAsRaw = options['fieldsAsRaw'] == null ? null : options['fieldsAsRaw']; // Return raw bson buffer instead of parsing it

  var raw = options['raw'] == null ? false : options['raw']; // Return BSONRegExp objects instead of native regular expressions

  var bsonRegExp = typeof options['bsonRegExp'] === 'boolean' ? options['bsonRegExp'] : false; // Controls the promotion of values vs wrapper classes

  var promoteBuffers = options['promoteBuffers'] == null ? false : options['promoteBuffers'];
  var promoteLongs = options['promoteLongs'] == null ? true : options['promoteLongs'];
  var promoteValues = options['promoteValues'] == null ? true : options['promoteValues']; // Set the start index

  var startIndex = index; // Validate that we have at least 4 bytes of buffer

  if (buffer$$1.length < 5) throw new Error('corrupt bson message < 5 bytes long'); // Read the document size

  var size = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Ensure buffer is valid size

  if (size < 5 || size > buffer$$1.length) throw new Error('corrupt bson message'); // Create holding object

  var object = isArray ? [] : {}; // Used for arrays to skip having to perform utf8 decoding

  var arrayIndex = 0;
  var done = false; // While we have more left data left keep parsing

  while (!done) {
    // Read the type
    var elementType = buffer$$1[index++]; // If we get a zero it's the last byte, exit

    if (elementType === 0) break; // Get the start search index

    var i = index; // Locate the end of the c string

    while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
      i++;
    } // If are at the end of the buffer there is a problem with the document


    if (i >= Buffer$4.byteLength(buffer$$1)) throw new Error('Bad BSON Document: illegal CString');
    var name = isArray ? arrayIndex++ : buffer$$1.toString('utf8', index, i);
    index = i + 1;

    if (elementType === constants.BSON_DATA_STRING) {
      var stringSize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
      if (stringSize <= 0 || stringSize > buffer$$1.length - index || buffer$$1[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');

      if (!validateUtf8$1(buffer$$1, index, index + stringSize - 1)) {
        throw new Error('Invalid UTF-8 string in BSON document');
      }

      var s = buffer$$1.toString('utf8', index, index + stringSize - 1);
      object[name] = s;
      index = index + stringSize;
    } else if (elementType === constants.BSON_DATA_OID) {
      var oid = Buffer$4.alloc(12);
      buffer$$1.copy(oid, 0, index, index + 12);
      object[name] = new objectid(oid);
      index = index + 12;
    } else if (elementType === constants.BSON_DATA_INT && promoteValues === false) {
      object[name] = new int_32(buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24);
    } else if (elementType === constants.BSON_DATA_INT) {
      object[name] = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
    } else if (elementType === constants.BSON_DATA_NUMBER && promoteValues === false) {
      object[name] = new double_1(buffer$$1.readDoubleLE(index));
      index = index + 8;
    } else if (elementType === constants.BSON_DATA_NUMBER) {
      object[name] = buffer$$1.readDoubleLE(index);
      index = index + 8;
    } else if (elementType === constants.BSON_DATA_DATE) {
      var lowBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
      var highBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
      object[name] = new Date(new long_1(lowBits, highBits).toNumber());
    } else if (elementType === constants.BSON_DATA_BOOLEAN) {
      if (buffer$$1[index] !== 0 && buffer$$1[index] !== 1) throw new Error('illegal boolean type value');
      object[name] = buffer$$1[index++] === 1;
    } else if (elementType === constants.BSON_DATA_OBJECT) {
      var _index = index;
      var objectSize = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24;
      if (objectSize <= 0 || objectSize > buffer$$1.length - index) throw new Error('bad embedded document length in bson'); // We have a raw value

      if (raw) {
        object[name] = buffer$$1.slice(index, index + objectSize);
      } else {
        object[name] = deserializeObject(buffer$$1, _index, options, false);
      }

      index = index + objectSize;
    } else if (elementType === constants.BSON_DATA_ARRAY) {
      var _index2 = index;

      var _objectSize = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24;

      var arrayOptions = options; // Stop index

      var stopIndex = index + _objectSize; // All elements of array to be returned as raw bson

      if (fieldsAsRaw && fieldsAsRaw[name]) {
        arrayOptions = {};

        for (var n in options) {
          arrayOptions[n] = options[n];
        }

        arrayOptions['raw'] = true;
      }

      object[name] = deserializeObject(buffer$$1, _index2, arrayOptions, true);
      index = index + _objectSize;
      if (buffer$$1[index - 1] !== 0) throw new Error('invalid array terminator byte');
      if (index !== stopIndex) throw new Error('corrupted array bson');
    } else if (elementType === constants.BSON_DATA_UNDEFINED) {
      object[name] = undefined;
    } else if (elementType === constants.BSON_DATA_NULL) {
      object[name] = null;
    } else if (elementType === constants.BSON_DATA_LONG) {
      // Unpack the low and high bits
      var _lowBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

      var _highBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

      var long$$1 = new long_1(_lowBits, _highBits); // Promote the long if possible

      if (promoteLongs && promoteValues === true) {
        object[name] = long$$1.lessThanOrEqual(JS_INT_MAX_LONG) && long$$1.greaterThanOrEqual(JS_INT_MIN_LONG) ? long$$1.toNumber() : long$$1;
      } else {
        object[name] = long$$1;
      }
    } else if (elementType === constants.BSON_DATA_DECIMAL128) {
      // Buffer to contain the decimal bytes
      var bytes = Buffer$4.alloc(16); // Copy the next 16 bytes into the bytes buffer

      buffer$$1.copy(bytes, 0, index, index + 16); // Update index

      index = index + 16; // Assign the new Decimal128 value

      var decimal128$$1 = new decimal128(bytes); // If we have an alternative mapper use that

      object[name] = decimal128$$1.toObject ? decimal128$$1.toObject() : decimal128$$1;
    } else if (elementType === constants.BSON_DATA_BINARY) {
      var binarySize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
      var totalBinarySize = binarySize;
      var subType = buffer$$1[index++]; // Did we have a negative binary size, throw

      if (binarySize < 0) throw new Error('Negative binary type element size found'); // Is the length longer than the document

      if (binarySize > Buffer$4.byteLength(buffer$$1)) throw new Error('Binary type size larger than document size'); // Decode as raw Buffer object if options specifies it

      if (buffer$$1['slice'] != null) {
        // If we have subtype 2 skip the 4 bytes for the size
        if (subType === binary.SUBTYPE_BYTE_ARRAY) {
          binarySize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
          if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
          if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
          if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
        }

        if (promoteBuffers && promoteValues) {
          object[name] = buffer$$1.slice(index, index + binarySize);
        } else {
          object[name] = new binary(buffer$$1.slice(index, index + binarySize), subType);
        }
      } else {
        var _buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(binarySize)) : new Array(binarySize); // If we have subtype 2 skip the 4 bytes for the size


        if (subType === binary.SUBTYPE_BYTE_ARRAY) {
          binarySize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
          if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
          if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
          if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
        } // Copy the data


        for (i = 0; i < binarySize; i++) {
          _buffer[i] = buffer$$1[index + i];
        }

        if (promoteBuffers && promoteValues) {
          object[name] = _buffer;
        } else {
          object[name] = new binary(_buffer, subType);
        }
      } // Update the index


      index = index + binarySize;
    } else if (elementType === constants.BSON_DATA_REGEXP && bsonRegExp === false) {
      // Get the start search index
      i = index; // Locate the end of the c string

      while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
        i++;
      } // If are at the end of the buffer there is a problem with the document


      if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

      var source = buffer$$1.toString('utf8', index, i); // Create the regexp

      index = i + 1; // Get the start search index

      i = index; // Locate the end of the c string

      while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
        i++;
      } // If are at the end of the buffer there is a problem with the document


      if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

      var regExpOptions = buffer$$1.toString('utf8', index, i);
      index = i + 1; // For each option add the corresponding one for javascript

      var optionsArray = new Array(regExpOptions.length); // Parse options

      for (i = 0; i < regExpOptions.length; i++) {
        switch (regExpOptions[i]) {
          case 'm':
            optionsArray[i] = 'm';
            break;

          case 's':
            optionsArray[i] = 'g';
            break;

          case 'i':
            optionsArray[i] = 'i';
            break;
        }
      }

      object[name] = new RegExp(source, optionsArray.join(''));
    } else if (elementType === constants.BSON_DATA_REGEXP && bsonRegExp === true) {
      // Get the start search index
      i = index; // Locate the end of the c string

      while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
        i++;
      } // If are at the end of the buffer there is a problem with the document


      if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

      var _source = buffer$$1.toString('utf8', index, i);

      index = i + 1; // Get the start search index

      i = index; // Locate the end of the c string

      while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
        i++;
      } // If are at the end of the buffer there is a problem with the document


      if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

      var _regExpOptions = buffer$$1.toString('utf8', index, i);

      index = i + 1; // Set the object

      object[name] = new regexp(_source, _regExpOptions);
    } else if (elementType === constants.BSON_DATA_SYMBOL) {
      var _stringSize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

      if (_stringSize <= 0 || _stringSize > buffer$$1.length - index || buffer$$1[index + _stringSize - 1] !== 0) throw new Error('bad string length in bson'); // symbol is deprecated - upgrade to string.

      object[name] = buffer$$1.toString('utf8', index, index + _stringSize - 1);
      index = index + _stringSize;
    } else if (elementType === constants.BSON_DATA_TIMESTAMP) {
      var _lowBits2 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

      var _highBits2 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

      object[name] = new timestamp(_lowBits2, _highBits2);
    } else if (elementType === constants.BSON_DATA_MIN_KEY) {
      object[name] = new min_key();
    } else if (elementType === constants.BSON_DATA_MAX_KEY) {
      object[name] = new max_key();
    } else if (elementType === constants.BSON_DATA_CODE) {
      var _stringSize2 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

      if (_stringSize2 <= 0 || _stringSize2 > buffer$$1.length - index || buffer$$1[index + _stringSize2 - 1] !== 0) throw new Error('bad string length in bson');
      var functionString = buffer$$1.toString('utf8', index, index + _stringSize2 - 1); // If we are evaluating the functions

      if (evalFunctions) {
        // If we have cache enabled let's look for the md5 of the function in the cache
        if (cacheFunctions) {
          var hash = cacheFunctionsCrc32 ? crc32(functionString) : functionString; // Got to do this to avoid V8 deoptimizing the call due to finding eval

          object[name] = isolateEvalWithHash(functionCache, hash, functionString, object);
        } else {
          object[name] = isolateEval(functionString);
        }
      } else {
        object[name] = new code(functionString);
      } // Update parse index position


      index = index + _stringSize2;
    } else if (elementType === constants.BSON_DATA_CODE_W_SCOPE) {
      var totalSize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Element cannot be shorter than totalSize + stringSize + documentSize + terminator

      if (totalSize < 4 + 4 + 4 + 1) {
        throw new Error('code_w_scope total size shorter minimum expected length');
      } // Get the code string size


      var _stringSize3 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Check if we have a valid string


      if (_stringSize3 <= 0 || _stringSize3 > buffer$$1.length - index || buffer$$1[index + _stringSize3 - 1] !== 0) throw new Error('bad string length in bson'); // Javascript function

      var _functionString = buffer$$1.toString('utf8', index, index + _stringSize3 - 1); // Update parse index position


      index = index + _stringSize3; // Parse the element

      var _index3 = index; // Decode the size of the object document

      var _objectSize2 = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24; // Decode the scope object


      var scopeObject = deserializeObject(buffer$$1, _index3, options, false); // Adjust the index

      index = index + _objectSize2; // Check if field length is to short

      if (totalSize < 4 + 4 + _objectSize2 + _stringSize3) {
        throw new Error('code_w_scope total size is to short, truncating scope');
      } // Check if totalSize field is to long


      if (totalSize > 4 + 4 + _objectSize2 + _stringSize3) {
        throw new Error('code_w_scope total size is to long, clips outer document');
      } // If we are evaluating the functions


      if (evalFunctions) {
        // If we have cache enabled let's look for the md5 of the function in the cache
        if (cacheFunctions) {
          var _hash = cacheFunctionsCrc32 ? crc32(_functionString) : _functionString; // Got to do this to avoid V8 deoptimizing the call due to finding eval


          object[name] = isolateEvalWithHash(functionCache, _hash, _functionString, object);
        } else {
          object[name] = isolateEval(_functionString);
        }

        object[name].scope = scopeObject;
      } else {
        object[name] = new code(_functionString, scopeObject);
      }
    } else if (elementType === constants.BSON_DATA_DBPOINTER) {
      // Get the code string size
      var _stringSize4 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Check if we have a valid string


      if (_stringSize4 <= 0 || _stringSize4 > buffer$$1.length - index || buffer$$1[index + _stringSize4 - 1] !== 0) throw new Error('bad string length in bson'); // Namespace

      if (!validateUtf8$1(buffer$$1, index, index + _stringSize4 - 1)) {
        throw new Error('Invalid UTF-8 string in BSON document');
      }

      var namespace = buffer$$1.toString('utf8', index, index + _stringSize4 - 1); // Update parse index position

      index = index + _stringSize4; // Read the oid

      var oidBuffer = Buffer$4.alloc(12);
      buffer$$1.copy(oidBuffer, 0, index, index + 12);

      var _oid = new objectid(oidBuffer); // Update the index


      index = index + 12; // Upgrade to DBRef type

      object[name] = new db_ref(namespace, _oid);
    } else {
      throw new Error('Detected unknown BSON type ' + elementType.toString(16) + ' for fieldname "' + name + '", are you using the latest BSON parser?');
    }
  } // Check if the deserialization was against a valid array/object


  if (size !== index - startIndex) {
    if (isArray) throw new Error('corrupt array bson');
    throw new Error('corrupt object bson');
  } // check if object's $ keys are those of a DBRef


  var dollarKeys = Object.keys(object).filter(function (k) {
    return k.startsWith('$');
  });
  var valid = true;
  dollarKeys.forEach(function (k) {
    if (['$ref', '$id', '$db'].indexOf(k) === -1) valid = false;
  }); // if a $key not in "$ref", "$id", "$db", don't make a DBRef

  if (!valid) return object;

  if (object['$id'] != null && object['$ref'] != null) {
    var copy = Object.assign({}, object);
    delete copy.$ref;
    delete copy.$id;
    delete copy.$db;
    return new db_ref(object.$ref, object.$id, object.$db || null, copy);
  }

  return object;
}
/**
 * Ensure eval is isolated.
 *
 * @ignore
 * @api private
 */


function isolateEvalWithHash(functionCache, hash, functionString, object) {
  // Contains the value we are going to set
  var value = null; // Check for cache hit, eval if missing and return cached function

  if (functionCache[hash] == null) {
    eval('value = ' + functionString);
    functionCache[hash] = value;
  } // Set the object


  return functionCache[hash].bind(object);
}
/**
 * Ensure eval is isolated.
 *
 * @ignore
 * @api private
 */


function isolateEval(functionString) {
  // Contains the value we are going to set
  var value = null; // Eval the function

  eval('value = ' + functionString);
  return value;
}

var deserializer = deserialize$1;

// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
//  * Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
//  * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
//    may be used to endorse or promote products derived from this software
//    without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
//
// Modifications to writeIEEE754 to support negative zeroes made by Brian White

function readIEEE754(buffer$$1, offset, endian, mLen, nBytes) {
  var e,
      m,
      bBE = endian === 'big',
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = bBE ? 0 : nBytes - 1,
      d = bBE ? 1 : -1,
      s = buffer$$1[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer$$1[offset + i], i += d, nBits -= 8) {
  }

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer$$1[offset + i], i += d, nBits -= 8) {
  }

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}

function writeIEEE754(buffer$$1, value, offset, endian, mLen, nBytes) {
  var e,
      m,
      c,
      bBE = endian === 'big',
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      i = bBE ? nBytes - 1 : 0,
      d = bBE ? -1 : 1,
      s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  if (isNaN(value)) m = 0;

  while (mLen >= 8) {
    buffer$$1[offset + i] = m & 0xff;
    i += d;
    m /= 256;
    mLen -= 8;
  }

  e = e << mLen | m;
  if (isNaN(value)) e += 8;
  eLen += mLen;

  while (eLen > 0) {
    buffer$$1[offset + i] = e & 0xff;
    i += d;
    e /= 256;
    eLen -= 8;
  }

  buffer$$1[offset + i - d] |= s * 128;
}

var float_parser = {
  readIEEE754: readIEEE754,
  writeIEEE754: writeIEEE754
};

function _typeof$3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

var Buffer$5 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer;
var writeIEEE754$1 = float_parser.writeIEEE754;
var normalizedFunctionString$1 = utils.normalizedFunctionString;
var regexp$1 = /\x00/; // eslint-disable-line no-control-regex

var ignoreKeys = new Set(['$db', '$ref', '$id', '$clusterTime']); // To ensure that 0.4 of node works correctly

var isDate$1 = function isDate(d) {
  return _typeof$3(d) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
};

var isRegExp$1 = function isRegExp(d) {
  return Object.prototype.toString.call(d) === '[object RegExp]';
};

function serializeString(buffer$$1, key, value, index, isArray) {
  // Encode String type
  buffer$$1[index++] = constants.BSON_DATA_STRING; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes + 1;
  buffer$$1[index - 1] = 0; // Write the string

  var size = buffer$$1.write(value, index + 4, 'utf8'); // Write the size of the string to buffer

  buffer$$1[index + 3] = size + 1 >> 24 & 0xff;
  buffer$$1[index + 2] = size + 1 >> 16 & 0xff;
  buffer$$1[index + 1] = size + 1 >> 8 & 0xff;
  buffer$$1[index] = size + 1 & 0xff; // Update index

  index = index + 4 + size; // Write zero

  buffer$$1[index++] = 0;
  return index;
}

function serializeNumber(buffer$$1, key, value, index, isArray) {
  // We have an integer value
  if (Math.floor(value) === value && value >= constants.JS_INT_MIN && value <= constants.JS_INT_MAX) {
    // If the value fits in 32 bits encode as int, if it fits in a double
    // encode it as a double, otherwise long
    if (value >= constants.BSON_INT32_MIN && value <= constants.BSON_INT32_MAX) {
      // Set int type 32 bits or less
      buffer$$1[index++] = constants.BSON_DATA_INT; // Number of written bytes

      var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

      index = index + numberOfWrittenBytes;
      buffer$$1[index++] = 0; // Write the int value

      buffer$$1[index++] = value & 0xff;
      buffer$$1[index++] = value >> 8 & 0xff;
      buffer$$1[index++] = value >> 16 & 0xff;
      buffer$$1[index++] = value >> 24 & 0xff;
    } else if (value >= constants.JS_INT_MIN && value <= constants.JS_INT_MAX) {
      // Encode as double
      buffer$$1[index++] = constants.BSON_DATA_NUMBER; // Number of written bytes

      var _numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


      index = index + _numberOfWrittenBytes;
      buffer$$1[index++] = 0; // Write float

      writeIEEE754$1(buffer$$1, value, index, 'little', 52, 8); // Ajust index

      index = index + 8;
    } else {
      // Set long type
      buffer$$1[index++] = constants.BSON_DATA_LONG; // Number of written bytes

      var _numberOfWrittenBytes2 = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


      index = index + _numberOfWrittenBytes2;
      buffer$$1[index++] = 0;
      var longVal = long_1.fromNumber(value);
      var lowBits = longVal.getLowBits();
      var highBits = longVal.getHighBits(); // Encode low bits

      buffer$$1[index++] = lowBits & 0xff;
      buffer$$1[index++] = lowBits >> 8 & 0xff;
      buffer$$1[index++] = lowBits >> 16 & 0xff;
      buffer$$1[index++] = lowBits >> 24 & 0xff; // Encode high bits

      buffer$$1[index++] = highBits & 0xff;
      buffer$$1[index++] = highBits >> 8 & 0xff;
      buffer$$1[index++] = highBits >> 16 & 0xff;
      buffer$$1[index++] = highBits >> 24 & 0xff;
    }
  } else {
    // Encode as double
    buffer$$1[index++] = constants.BSON_DATA_NUMBER; // Number of written bytes

    var _numberOfWrittenBytes3 = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


    index = index + _numberOfWrittenBytes3;
    buffer$$1[index++] = 0; // Write float

    writeIEEE754$1(buffer$$1, value, index, 'little', 52, 8); // Ajust index

    index = index + 8;
  }

  return index;
}

function serializeNull(buffer$$1, key, value, index, isArray) {
  // Set long type
  buffer$$1[index++] = constants.BSON_DATA_NULL; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0;
  return index;
}

function serializeBoolean(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_BOOLEAN; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Encode the boolean value

  buffer$$1[index++] = value ? 1 : 0;
  return index;
}

function serializeDate(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_DATE; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Write the date

  var dateInMilis = long_1.fromNumber(value.getTime());
  var lowBits = dateInMilis.getLowBits();
  var highBits = dateInMilis.getHighBits(); // Encode low bits

  buffer$$1[index++] = lowBits & 0xff;
  buffer$$1[index++] = lowBits >> 8 & 0xff;
  buffer$$1[index++] = lowBits >> 16 & 0xff;
  buffer$$1[index++] = lowBits >> 24 & 0xff; // Encode high bits

  buffer$$1[index++] = highBits & 0xff;
  buffer$$1[index++] = highBits >> 8 & 0xff;
  buffer$$1[index++] = highBits >> 16 & 0xff;
  buffer$$1[index++] = highBits >> 24 & 0xff;
  return index;
}

function serializeRegExp(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_REGEXP; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0;

  if (value.source && value.source.match(regexp$1) != null) {
    throw Error('value ' + value.source + ' must not contain null bytes');
  } // Adjust the index


  index = index + buffer$$1.write(value.source, index, 'utf8'); // Write zero

  buffer$$1[index++] = 0x00; // Write the parameters

  if (value.ignoreCase) buffer$$1[index++] = 0x69; // i

  if (value.global) buffer$$1[index++] = 0x73; // s

  if (value.multiline) buffer$$1[index++] = 0x6d; // m
  // Add ending zero

  buffer$$1[index++] = 0x00;
  return index;
}

function serializeBSONRegExp(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_REGEXP; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Check the pattern for 0 bytes

  if (value.pattern.match(regexp$1) != null) {
    // The BSON spec doesn't allow keys with null bytes because keys are
    // null-terminated.
    throw Error('pattern ' + value.pattern + ' must not contain null bytes');
  } // Adjust the index


  index = index + buffer$$1.write(value.pattern, index, 'utf8'); // Write zero

  buffer$$1[index++] = 0x00; // Write the options

  index = index + buffer$$1.write(value.options.split('').sort().join(''), index, 'utf8'); // Add ending zero

  buffer$$1[index++] = 0x00;
  return index;
}

function serializeMinMax(buffer$$1, key, value, index, isArray) {
  // Write the type of either min or max key
  if (value === null) {
    buffer$$1[index++] = constants.BSON_DATA_NULL;
  } else if (value._bsontype === 'MinKey') {
    buffer$$1[index++] = constants.BSON_DATA_MIN_KEY;
  } else {
    buffer$$1[index++] = constants.BSON_DATA_MAX_KEY;
  } // Number of written bytes


  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0;
  return index;
}

function serializeObjectId(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_OID; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Write the objectId into the shared buffer

  if (typeof value.id === 'string') {
    buffer$$1.write(value.id, index, 'binary');
  } else if (value.id && value.id.copy) {
    value.id.copy(buffer$$1, index, 0, 12);
  } else {
    throw new TypeError('object [' + JSON.stringify(value) + '] is not a valid ObjectId');
  } // Ajust index


  return index + 12;
}

function serializeBuffer(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_BINARY; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Get size of the buffer (current write point)

  var size = value.length; // Write the size of the string to buffer

  buffer$$1[index++] = size & 0xff;
  buffer$$1[index++] = size >> 8 & 0xff;
  buffer$$1[index++] = size >> 16 & 0xff;
  buffer$$1[index++] = size >> 24 & 0xff; // Write the default subtype

  buffer$$1[index++] = constants.BSON_BINARY_SUBTYPE_DEFAULT; // Copy the content form the binary field to the buffer

  value.copy(buffer$$1, index, 0, size); // Adjust the index

  index = index + size;
  return index;
}

function serializeObject(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray, path) {
  for (var i = 0; i < path.length; i++) {
    if (path[i] === value) throw new Error('cyclic dependency detected');
  } // Push value to stack


  path.push(value); // Write the type

  buffer$$1[index++] = Array.isArray(value) ? constants.BSON_DATA_ARRAY : constants.BSON_DATA_OBJECT; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0;
  var endIndex = serializeInto(buffer$$1, value, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined, path); // Pop stack

  path.pop();
  return endIndex;
}

function serializeDecimal128(buffer$$1, key, value, index, isArray) {
  buffer$$1[index++] = constants.BSON_DATA_DECIMAL128; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Write the data from the value

  value.bytes.copy(buffer$$1, index, 0, 16);
  return index + 16;
}

function serializeLong(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = value._bsontype === 'Long' ? constants.BSON_DATA_LONG : constants.BSON_DATA_TIMESTAMP; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Write the date

  var lowBits = value.getLowBits();
  var highBits = value.getHighBits(); // Encode low bits

  buffer$$1[index++] = lowBits & 0xff;
  buffer$$1[index++] = lowBits >> 8 & 0xff;
  buffer$$1[index++] = lowBits >> 16 & 0xff;
  buffer$$1[index++] = lowBits >> 24 & 0xff; // Encode high bits

  buffer$$1[index++] = highBits & 0xff;
  buffer$$1[index++] = highBits >> 8 & 0xff;
  buffer$$1[index++] = highBits >> 16 & 0xff;
  buffer$$1[index++] = highBits >> 24 & 0xff;
  return index;
}

function serializeInt32(buffer$$1, key, value, index, isArray) {
  // Set int type 32 bits or less
  buffer$$1[index++] = constants.BSON_DATA_INT; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Write the int value

  buffer$$1[index++] = value & 0xff;
  buffer$$1[index++] = value >> 8 & 0xff;
  buffer$$1[index++] = value >> 16 & 0xff;
  buffer$$1[index++] = value >> 24 & 0xff;
  return index;
}

function serializeDouble(buffer$$1, key, value, index, isArray) {
  // Encode as double
  buffer$$1[index++] = constants.BSON_DATA_NUMBER; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Write float

  writeIEEE754$1(buffer$$1, value.value, index, 'little', 52, 8); // Adjust index

  index = index + 8;
  return index;
}

function serializeFunction(buffer$$1, key, value, index, checkKeys, depth, isArray) {
  buffer$$1[index++] = constants.BSON_DATA_CODE; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Function string

  var functionString = normalizedFunctionString$1(value); // Write the string

  var size = buffer$$1.write(functionString, index + 4, 'utf8') + 1; // Write the size of the string to buffer

  buffer$$1[index] = size & 0xff;
  buffer$$1[index + 1] = size >> 8 & 0xff;
  buffer$$1[index + 2] = size >> 16 & 0xff;
  buffer$$1[index + 3] = size >> 24 & 0xff; // Update index

  index = index + 4 + size - 1; // Write zero

  buffer$$1[index++] = 0;
  return index;
}

function serializeCode(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray) {
  if (value.scope && _typeof$3(value.scope) === 'object') {
    // Write the type
    buffer$$1[index++] = constants.BSON_DATA_CODE_W_SCOPE; // Number of written bytes

    var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

    index = index + numberOfWrittenBytes;
    buffer$$1[index++] = 0; // Starting index

    var startIndex = index; // Serialize the function
    // Get the function string

    var functionString = typeof value.code === 'string' ? value.code : value.code.toString(); // Index adjustment

    index = index + 4; // Write string into buffer

    var codeSize = buffer$$1.write(functionString, index + 4, 'utf8') + 1; // Write the size of the string to buffer

    buffer$$1[index] = codeSize & 0xff;
    buffer$$1[index + 1] = codeSize >> 8 & 0xff;
    buffer$$1[index + 2] = codeSize >> 16 & 0xff;
    buffer$$1[index + 3] = codeSize >> 24 & 0xff; // Write end 0

    buffer$$1[index + 4 + codeSize - 1] = 0; // Write the

    index = index + codeSize + 4; //
    // Serialize the scope value

    var endIndex = serializeInto(buffer$$1, value.scope, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined);
    index = endIndex - 1; // Writ the total

    var totalSize = endIndex - startIndex; // Write the total size of the object

    buffer$$1[startIndex++] = totalSize & 0xff;
    buffer$$1[startIndex++] = totalSize >> 8 & 0xff;
    buffer$$1[startIndex++] = totalSize >> 16 & 0xff;
    buffer$$1[startIndex++] = totalSize >> 24 & 0xff; // Write trailing zero

    buffer$$1[index++] = 0;
  } else {
    buffer$$1[index++] = constants.BSON_DATA_CODE; // Number of written bytes

    var _numberOfWrittenBytes4 = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


    index = index + _numberOfWrittenBytes4;
    buffer$$1[index++] = 0; // Function string

    var _functionString = value.code.toString(); // Write the string


    var size = buffer$$1.write(_functionString, index + 4, 'utf8') + 1; // Write the size of the string to buffer

    buffer$$1[index] = size & 0xff;
    buffer$$1[index + 1] = size >> 8 & 0xff;
    buffer$$1[index + 2] = size >> 16 & 0xff;
    buffer$$1[index + 3] = size >> 24 & 0xff; // Update index

    index = index + 4 + size - 1; // Write zero

    buffer$$1[index++] = 0;
  }

  return index;
}

function serializeBinary(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_BINARY; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Extract the buffer

  var data = value.value(true); // Calculate size

  var size = value.position; // Add the deprecated 02 type 4 bytes of size to total

  if (value.sub_type === binary.SUBTYPE_BYTE_ARRAY) size = size + 4; // Write the size of the string to buffer

  buffer$$1[index++] = size & 0xff;
  buffer$$1[index++] = size >> 8 & 0xff;
  buffer$$1[index++] = size >> 16 & 0xff;
  buffer$$1[index++] = size >> 24 & 0xff; // Write the subtype to the buffer

  buffer$$1[index++] = value.sub_type; // If we have binary type 2 the 4 first bytes are the size

  if (value.sub_type === binary.SUBTYPE_BYTE_ARRAY) {
    size = size - 4;
    buffer$$1[index++] = size & 0xff;
    buffer$$1[index++] = size >> 8 & 0xff;
    buffer$$1[index++] = size >> 16 & 0xff;
    buffer$$1[index++] = size >> 24 & 0xff;
  } // Write the data to the object


  data.copy(buffer$$1, index, 0, value.position); // Adjust the index

  index = index + value.position;
  return index;
}

function serializeSymbol(buffer$$1, key, value, index, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_SYMBOL; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0; // Write the string

  var size = buffer$$1.write(value.value, index + 4, 'utf8') + 1; // Write the size of the string to buffer

  buffer$$1[index] = size & 0xff;
  buffer$$1[index + 1] = size >> 8 & 0xff;
  buffer$$1[index + 2] = size >> 16 & 0xff;
  buffer$$1[index + 3] = size >> 24 & 0xff; // Update index

  index = index + 4 + size - 1; // Write zero

  buffer$$1[index++] = 0x00;
  return index;
}

function serializeDBRef(buffer$$1, key, value, index, depth, serializeFunctions, isArray) {
  // Write the type
  buffer$$1[index++] = constants.BSON_DATA_OBJECT; // Number of written bytes

  var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

  index = index + numberOfWrittenBytes;
  buffer$$1[index++] = 0;
  var startIndex = index;
  var endIndex;
  var output = {
    $ref: value.collection || value.namespace,
    // "namespace" was what library 1.x called "collection"
    $id: value.oid
  };
  if (value.db != null) output.$db = value.db;
  output = Object.assign(output, value.fields);
  endIndex = serializeInto(buffer$$1, output, false, index, depth + 1, serializeFunctions); // Calculate object size

  var size = endIndex - startIndex; // Write the size

  buffer$$1[startIndex++] = size & 0xff;
  buffer$$1[startIndex++] = size >> 8 & 0xff;
  buffer$$1[startIndex++] = size >> 16 & 0xff;
  buffer$$1[startIndex++] = size >> 24 & 0xff; // Set index

  return endIndex;
}

function serializeInto(buffer$$1, object, checkKeys, startingIndex, depth, serializeFunctions, ignoreUndefined, path) {
  startingIndex = startingIndex || 0;
  path = path || []; // Push the object to the path

  path.push(object); // Start place to serialize into

  var index = startingIndex + 4; // Special case isArray

  if (Array.isArray(object)) {
    // Get object keys
    for (var i = 0; i < object.length; i++) {
      var key = '' + i;
      var value = object[i]; // Is there an override value

      if (value && value.toBSON) {
        if (typeof value.toBSON !== 'function') throw new TypeError('toBSON is not a function');
        value = value.toBSON();
      }

      var type = _typeof$3(value);

      if (type === 'string') {
        index = serializeString(buffer$$1, key, value, index, true);
      } else if (type === 'number') {
        index = serializeNumber(buffer$$1, key, value, index, true);
      } else if (type === 'boolean') {
        index = serializeBoolean(buffer$$1, key, value, index, true);
      } else if (value instanceof Date || isDate$1(value)) {
        index = serializeDate(buffer$$1, key, value, index, true);
      } else if (value === undefined) {
        index = serializeNull(buffer$$1, key, value, index, true);
      } else if (value === null) {
        index = serializeNull(buffer$$1, key, value, index, true);
      } else if (value['_bsontype'] === 'ObjectId' || value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer$$1, key, value, index, true);
      } else if (Buffer$5.isBuffer(value)) {
        index = serializeBuffer(buffer$$1, key, value, index, true);
      } else if (value instanceof RegExp || isRegExp$1(value)) {
        index = serializeRegExp(buffer$$1, key, value, index, true);
      } else if (type === 'object' && value['_bsontype'] == null) {
        index = serializeObject(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true, path);
      } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer$$1, key, value, index, true);
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer$$1, key, value, index, true);
      } else if (value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer$$1, key, value, index, true);
      } else if (typeof value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, true);
      } else if (value['_bsontype'] === 'Code') {
        index = serializeCode(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true);
      } else if (value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer$$1, key, value, index, true);
      } else if (value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer$$1, key, value, index, true);
      } else if (value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer$$1, key, value, index, depth, serializeFunctions, true);
      } else if (value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer$$1, key, value, index, true);
      } else if (value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer$$1, key, value, index, true);
      } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer$$1, key, value, index, true);
      } else if (typeof value['_bsontype'] !== 'undefined') {
        throw new TypeError('Unrecognized or invalid _bsontype: ' + value['_bsontype']);
      }
    }
  } else if (object instanceof map) {
    var iterator = object.entries();
    var done = false;

    while (!done) {
      // Unpack the next entry
      var entry = iterator.next();
      done = entry.done; // Are we done, then skip and terminate

      if (done) continue; // Get the entry values

      var _key = entry.value[0];
      var _value = entry.value[1]; // Check the type of the value

      var _type = _typeof$3(_value); // Check the key and throw error if it's illegal


      if (typeof _key === 'string' && !ignoreKeys.has(_key)) {
        if (_key.match(regexp$1) != null) {
          // The BSON spec doesn't allow keys with null bytes because keys are
          // null-terminated.
          throw Error('key ' + _key + ' must not contain null bytes');
        }

        if (checkKeys) {
          if ('$' === _key[0]) {
            throw Error('key ' + _key + " must not start with '$'");
          } else if (~_key.indexOf('.')) {
            throw Error('key ' + _key + " must not contain '.'");
          }
        }
      }

      if (_type === 'string') {
        index = serializeString(buffer$$1, _key, _value, index);
      } else if (_type === 'number') {
        index = serializeNumber(buffer$$1, _key, _value, index);
      } else if (_type === 'boolean') {
        index = serializeBoolean(buffer$$1, _key, _value, index);
      } else if (_value instanceof Date || isDate$1(_value)) {
        index = serializeDate(buffer$$1, _key, _value, index);
      } else if (_value === null || _value === undefined && ignoreUndefined === false) {
        index = serializeNull(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'ObjectId' || _value['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer$$1, _key, _value, index);
      } else if (Buffer$5.isBuffer(_value)) {
        index = serializeBuffer(buffer$$1, _key, _value, index);
      } else if (_value instanceof RegExp || isRegExp$1(_value)) {
        index = serializeRegExp(buffer$$1, _key, _value, index);
      } else if (_type === 'object' && _value['_bsontype'] == null) {
        index = serializeObject(buffer$$1, _key, _value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
      } else if (_type === 'object' && _value['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'Long' || _value['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'Double') {
        index = serializeDouble(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'Code') {
        index = serializeCode(buffer$$1, _key, _value, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
      } else if (typeof _value === 'function' && serializeFunctions) {
        index = serializeFunction(buffer$$1, _key, _value, index, checkKeys, depth, serializeFunctions);
      } else if (_value['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer$$1, _key, _value, index, depth, serializeFunctions);
      } else if (_value['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer$$1, _key, _value, index);
      } else if (_value['_bsontype'] === 'MinKey' || _value['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer$$1, _key, _value, index);
      } else if (typeof _value['_bsontype'] !== 'undefined') {
        throw new TypeError('Unrecognized or invalid _bsontype: ' + _value['_bsontype']);
      }
    }
  } else {
    // Did we provide a custom serialization method
    if (object.toBSON) {
      if (typeof object.toBSON !== 'function') throw new TypeError('toBSON is not a function');
      object = object.toBSON();
      if (object != null && _typeof$3(object) !== 'object') throw new TypeError('toBSON function did not return an object');
    } // Iterate over all the keys


    for (var _key2 in object) {
      var _value2 = object[_key2]; // Is there an override value

      if (_value2 && _value2.toBSON) {
        if (typeof _value2.toBSON !== 'function') throw new TypeError('toBSON is not a function');
        _value2 = _value2.toBSON();
      } // Check the type of the value


      var _type2 = _typeof$3(_value2); // Check the key and throw error if it's illegal


      if (typeof _key2 === 'string' && !ignoreKeys.has(_key2)) {
        if (_key2.match(regexp$1) != null) {
          // The BSON spec doesn't allow keys with null bytes because keys are
          // null-terminated.
          throw Error('key ' + _key2 + ' must not contain null bytes');
        }

        if (checkKeys) {
          if ('$' === _key2[0]) {
            throw Error('key ' + _key2 + " must not start with '$'");
          } else if (~_key2.indexOf('.')) {
            throw Error('key ' + _key2 + " must not contain '.'");
          }
        }
      }

      if (_type2 === 'string') {
        index = serializeString(buffer$$1, _key2, _value2, index);
      } else if (_type2 === 'number') {
        index = serializeNumber(buffer$$1, _key2, _value2, index);
      } else if (_type2 === 'boolean') {
        index = serializeBoolean(buffer$$1, _key2, _value2, index);
      } else if (_value2 instanceof Date || isDate$1(_value2)) {
        index = serializeDate(buffer$$1, _key2, _value2, index);
      } else if (_value2 === undefined) {
        if (ignoreUndefined === false) index = serializeNull(buffer$$1, _key2, _value2, index);
      } else if (_value2 === null) {
        index = serializeNull(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'ObjectId' || _value2['_bsontype'] === 'ObjectID') {
        index = serializeObjectId(buffer$$1, _key2, _value2, index);
      } else if (Buffer$5.isBuffer(_value2)) {
        index = serializeBuffer(buffer$$1, _key2, _value2, index);
      } else if (_value2 instanceof RegExp || isRegExp$1(_value2)) {
        index = serializeRegExp(buffer$$1, _key2, _value2, index);
      } else if (_type2 === 'object' && _value2['_bsontype'] == null) {
        index = serializeObject(buffer$$1, _key2, _value2, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
      } else if (_type2 === 'object' && _value2['_bsontype'] === 'Decimal128') {
        index = serializeDecimal128(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'Long' || _value2['_bsontype'] === 'Timestamp') {
        index = serializeLong(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'Double') {
        index = serializeDouble(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'Code') {
        index = serializeCode(buffer$$1, _key2, _value2, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
      } else if (typeof _value2 === 'function' && serializeFunctions) {
        index = serializeFunction(buffer$$1, _key2, _value2, index, checkKeys, depth, serializeFunctions);
      } else if (_value2['_bsontype'] === 'Binary') {
        index = serializeBinary(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'Symbol') {
        index = serializeSymbol(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'DBRef') {
        index = serializeDBRef(buffer$$1, _key2, _value2, index, depth, serializeFunctions);
      } else if (_value2['_bsontype'] === 'BSONRegExp') {
        index = serializeBSONRegExp(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'Int32') {
        index = serializeInt32(buffer$$1, _key2, _value2, index);
      } else if (_value2['_bsontype'] === 'MinKey' || _value2['_bsontype'] === 'MaxKey') {
        index = serializeMinMax(buffer$$1, _key2, _value2, index);
      } else if (typeof _value2['_bsontype'] !== 'undefined') {
        throw new TypeError('Unrecognized or invalid _bsontype: ' + _value2['_bsontype']);
      }
    }
  } // Remove the path


  path.pop(); // Final padding byte for object

  buffer$$1[index++] = 0x00; // Final size

  var size = index - startingIndex; // Write the size of the object

  buffer$$1[startingIndex++] = size & 0xff;
  buffer$$1[startingIndex++] = size >> 8 & 0xff;
  buffer$$1[startingIndex++] = size >> 16 & 0xff;
  buffer$$1[startingIndex++] = size >> 24 & 0xff;
  return index;
}

var serializer = serializeInto;

function _typeof$4(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

var Buffer$6 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer;
var normalizedFunctionString$2 = utils.normalizedFunctionString; // To ensure that 0.4 of node works correctly

function isDate$2(d) {
  return _typeof$4(d) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
}

function calculateObjectSize(object, serializeFunctions, ignoreUndefined) {
  var totalLength = 4 + 1;

  if (Array.isArray(object)) {
    for (var i = 0; i < object.length; i++) {
      totalLength += calculateElement(i.toString(), object[i], serializeFunctions, true, ignoreUndefined);
    }
  } else {
    // If we have toBSON defined, override the current object
    if (object.toBSON) {
      object = object.toBSON();
    } // Calculate size


    for (var key in object) {
      totalLength += calculateElement(key, object[key], serializeFunctions, false, ignoreUndefined);
    }
  }

  return totalLength;
}
/**
 * @ignore
 * @api private
 */


function calculateElement(name, value, serializeFunctions, isArray, ignoreUndefined) {
  // If we have toBSON defined, override the current object
  if (value && value.toBSON) {
    value = value.toBSON();
  }

  switch (_typeof$4(value)) {
    case 'string':
      return 1 + Buffer$6.byteLength(name, 'utf8') + 1 + 4 + Buffer$6.byteLength(value, 'utf8') + 1;

    case 'number':
      if (Math.floor(value) === value && value >= constants.JS_INT_MIN && value <= constants.JS_INT_MAX) {
        if (value >= constants.BSON_INT32_MIN && value <= constants.BSON_INT32_MAX) {
          // 32 bit
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (4 + 1);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
        }
      } else {
        // 64 bit
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      }

    case 'undefined':
      if (isArray || !ignoreUndefined) return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1;
      return 0;

    case 'boolean':
      return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (1 + 1);

    case 'object':
      if (value == null || value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1;
      } else if (value['_bsontype'] === 'ObjectId' || value['_bsontype'] === 'ObjectID') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (12 + 1);
      } else if (value instanceof Date || isDate$2(value)) {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      } else if (typeof Buffer$6 !== 'undefined' && Buffer$6.isBuffer(value)) {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (1 + 4 + 1) + value.length;
      } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Double' || value['_bsontype'] === 'Timestamp') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
      } else if (value['_bsontype'] === 'Decimal128') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (16 + 1);
      } else if (value['_bsontype'] === 'Code') {
        // Calculate size depending on the availability of a scope
        if (value.scope != null && Object.keys(value.scope).length > 0) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(value.code.toString(), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$6.byteLength(value.code.toString(), 'utf8') + 1;
        }
      } else if (value['_bsontype'] === 'Binary') {
        // Check what kind of subtype we have
        if (value.sub_type === binary.SUBTYPE_BYTE_ARRAY) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1 + 4);
        } else {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1);
        }
      } else if (value['_bsontype'] === 'Symbol') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + Buffer$6.byteLength(value.value, 'utf8') + 4 + 1 + 1;
      } else if (value['_bsontype'] === 'DBRef') {
        // Set up correct object for serialization
        var ordered_values = Object.assign({
          $ref: value.collection,
          $id: value.oid
        }, value.fields); // Add db reference if it exists

        if (value.db != null) {
          ordered_values['$db'] = value.db;
        }

        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + calculateObjectSize(ordered_values, serializeFunctions, ignoreUndefined);
      } else if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
      } else if (value['_bsontype'] === 'BSONRegExp') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.pattern, 'utf8') + 1 + Buffer$6.byteLength(value.options, 'utf8') + 1;
      } else {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + calculateObjectSize(value, serializeFunctions, ignoreUndefined) + 1;
      }

    case 'function':
      // WTF for 0.4.X where typeof /someregexp/ === 'function'
      if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]' || String.call(value) === '[object RegExp]') {
        return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$6.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
      } else {
        if (serializeFunctions && value.scope != null && Object.keys(value.scope).length > 0) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(value), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
        } else if (serializeFunctions) {
          return (name != null ? Buffer$6.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(value), 'utf8') + 1;
        }
      }

  }

  return 0;
}

var calculate_size = calculateObjectSize;

var Buffer$7 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer;
/**
 * Makes sure that, if a Uint8Array is passed in, it is wrapped in a Buffer.
 *
 * @param {Buffer|Uint8Array} potentialBuffer The potential buffer
 * @returns {Buffer} the input if potentialBuffer is a buffer, or a buffer that
 * wraps a passed in Uint8Array
 * @throws {TypeError} If anything other than a Buffer or Uint8Array is passed in
 */

var ensure_buffer = function ensureBuffer(potentialBuffer) {
  if (potentialBuffer instanceof Buffer$7) {
    return potentialBuffer;
  }

  if (potentialBuffer instanceof Uint8Array) {
    return Buffer$7.from(potentialBuffer.buffer);
  }

  throw new TypeError('Must use either Buffer or Uint8Array');
};

var Buffer$8 = buffer__WEBPACK_IMPORTED_MODULE_1___default.a.Buffer; // Parts of the parser

/**
 * @ignore
 */
// Default Max Size

var MAXSIZE = 1024 * 1024 * 17; // Current Internal Temporary Serialization Buffer

var buffer$1 = Buffer$8.alloc(MAXSIZE);
/**
 * Sets the size of the internal serialization buffer.
 *
 * @method
 * @param {number} size The desired size for the internal serialization buffer
 */

function setInternalBufferSize(size) {
  // Resize the internal serialization buffer if needed
  if (buffer$1.length < size) {
    buffer$1 = Buffer$8.alloc(size);
  }
}
/**
 * Serialize a Javascript object.
 *
 * @param {Object} object the Javascript object to serialize.
 * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @return {Buffer} returns the Buffer object containing the serialized object.
 */


function serialize$1(object, options) {
  options = options || {}; // Unpack the options

  var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
  var minInternalBufferSize = typeof options.minInternalBufferSize === 'number' ? options.minInternalBufferSize : MAXSIZE; // Resize the internal serialization buffer if needed

  if (buffer$1.length < minInternalBufferSize) {
    buffer$1 = Buffer$8.alloc(minInternalBufferSize);
  } // Attempt to serialize


  var serializationIndex = serializer(buffer$1, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined, []); // Create the final buffer

  var finishedBuffer = Buffer$8.alloc(serializationIndex); // Copy into the finished buffer

  buffer$1.copy(finishedBuffer, 0, 0, finishedBuffer.length); // Return the buffer

  return finishedBuffer;
}
/**
 * Serialize a Javascript object using a predefined Buffer and index into the buffer, useful when pre-allocating the space for serialization.
 *
 * @param {Object} object the Javascript object to serialize.
 * @param {Buffer} buffer the Buffer you pre-allocated to store the serialized BSON object.
 * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @param {Number} [options.index] the index in the buffer where we wish to start serializing into.
 * @return {Number} returns the index pointing to the last written byte in the buffer.
 */


function serializeWithBufferAndIndex(object, finalBuffer, options) {
  options = options || {}; // Unpack the options

  var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
  var startIndex = typeof options.index === 'number' ? options.index : 0; // Attempt to serialize

  var serializationIndex = serializer(buffer$1, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined);
  buffer$1.copy(finalBuffer, startIndex, 0, serializationIndex); // Return the index

  return startIndex + serializationIndex - 1;
}
/**
 * Deserialize data as BSON.
 *
 * @param {Buffer} buffer the buffer containing the serialized set of BSON documents.
 * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
 * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
 * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
 * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
 * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
 * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
 * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
 * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
 * @param {boolean} [options.allowObjectSmallerThanBufferSize=false] allows the buffer to be larger than the parsed BSON object
 * @return {Object} returns the deserialized Javascript Object.
 */


function deserialize$2(buffer$$1, options) {
  buffer$$1 = ensure_buffer(buffer$$1);
  return deserializer(buffer$$1, options);
}
/**
 * Calculate the bson size for a passed in Javascript object.
 *
 * @param {Object} object the Javascript object to calculate the BSON byte size for.
 * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
 * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
 * @return {Number} returns the number of bytes the BSON object will take up.
 */


function calculateObjectSize$1(object, options) {
  options = options || {};
  var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
  var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
  return calculate_size(object, serializeFunctions, ignoreUndefined);
}
/**
 * Deserialize stream data as BSON documents.
 *
 * @param {Buffer} data the buffer containing the serialized set of BSON documents.
 * @param {Number} startIndex the start index in the data Buffer where the deserialization is to start.
 * @param {Number} numberOfDocuments number of documents to deserialize.
 * @param {Array} documents an array where to store the deserialized documents.
 * @param {Number} docStartIndex the index in the documents array from where to start inserting documents.
 * @param {Object} [options] additional options used for the deserialization.
 * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
 * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
 * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
 * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
 * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
 * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
 * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
 * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
 * @return {Number} returns the next index in the buffer after deserialization **x** numbers of documents.
 */


function deserializeStream(data, startIndex, numberOfDocuments, documents, docStartIndex, options) {
  options = Object.assign({
    allowObjectSmallerThanBufferSize: true
  }, options);
  data = ensure_buffer(data);
  var index = startIndex; // Loop over all documents

  for (var i = 0; i < numberOfDocuments; i++) {
    // Find size of the document
    var size = data[index] | data[index + 1] << 8 | data[index + 2] << 16 | data[index + 3] << 24; // Update options with index

    options.index = index; // Parse the document at this point

    documents[docStartIndex + i] = deserializer(data, options); // Adjust index by the document size

    index = index + size;
  } // Return object containing end index of parsing and list of documents


  return index;
}

var bson = {
  // constants
  // NOTE: this is done this way because rollup can't resolve an `Object.assign`ed export
  BSON_INT32_MAX: constants.BSON_INT32_MAX,
  BSON_INT32_MIN: constants.BSON_INT32_MIN,
  BSON_INT64_MAX: constants.BSON_INT64_MAX,
  BSON_INT64_MIN: constants.BSON_INT64_MIN,
  JS_INT_MAX: constants.JS_INT_MAX,
  JS_INT_MIN: constants.JS_INT_MIN,
  BSON_DATA_NUMBER: constants.BSON_DATA_NUMBER,
  BSON_DATA_STRING: constants.BSON_DATA_STRING,
  BSON_DATA_OBJECT: constants.BSON_DATA_OBJECT,
  BSON_DATA_ARRAY: constants.BSON_DATA_ARRAY,
  BSON_DATA_BINARY: constants.BSON_DATA_BINARY,
  BSON_DATA_UNDEFINED: constants.BSON_DATA_UNDEFINED,
  BSON_DATA_OID: constants.BSON_DATA_OID,
  BSON_DATA_BOOLEAN: constants.BSON_DATA_BOOLEAN,
  BSON_DATA_DATE: constants.BSON_DATA_DATE,
  BSON_DATA_NULL: constants.BSON_DATA_NULL,
  BSON_DATA_REGEXP: constants.BSON_DATA_REGEXP,
  BSON_DATA_DBPOINTER: constants.BSON_DATA_DBPOINTER,
  BSON_DATA_CODE: constants.BSON_DATA_CODE,
  BSON_DATA_SYMBOL: constants.BSON_DATA_SYMBOL,
  BSON_DATA_CODE_W_SCOPE: constants.BSON_DATA_CODE_W_SCOPE,
  BSON_DATA_INT: constants.BSON_DATA_INT,
  BSON_DATA_TIMESTAMP: constants.BSON_DATA_TIMESTAMP,
  BSON_DATA_LONG: constants.BSON_DATA_LONG,
  BSON_DATA_DECIMAL128: constants.BSON_DATA_DECIMAL128,
  BSON_DATA_MIN_KEY: constants.BSON_DATA_MIN_KEY,
  BSON_DATA_MAX_KEY: constants.BSON_DATA_MAX_KEY,
  BSON_BINARY_SUBTYPE_DEFAULT: constants.BSON_BINARY_SUBTYPE_DEFAULT,
  BSON_BINARY_SUBTYPE_FUNCTION: constants.BSON_BINARY_SUBTYPE_FUNCTION,
  BSON_BINARY_SUBTYPE_BYTE_ARRAY: constants.BSON_BINARY_SUBTYPE_BYTE_ARRAY,
  BSON_BINARY_SUBTYPE_UUID: constants.BSON_BINARY_SUBTYPE_UUID,
  BSON_BINARY_SUBTYPE_MD5: constants.BSON_BINARY_SUBTYPE_MD5,
  BSON_BINARY_SUBTYPE_USER_DEFINED: constants.BSON_BINARY_SUBTYPE_USER_DEFINED,
  // wrapped types
  Code: code,
  Map: map,
  BSONSymbol: symbol,
  DBRef: db_ref,
  Binary: binary,
  ObjectId: objectid,
  Long: long_1,
  Timestamp: timestamp,
  Double: double_1,
  Int32: int_32,
  MinKey: min_key,
  MaxKey: max_key,
  BSONRegExp: regexp,
  Decimal128: decimal128,
  // methods
  serialize: serialize$1,
  serializeWithBufferAndIndex: serializeWithBufferAndIndex,
  deserialize: deserialize$2,
  calculateObjectSize: calculateObjectSize$1,
  deserializeStream: deserializeStream,
  setInternalBufferSize: setInternalBufferSize,
  // legacy support
  ObjectID: objectid,
  // Extended JSON
  EJSON: extended_json
};
var bson_1 = bson.BSON_INT32_MAX;
var bson_2 = bson.BSON_INT32_MIN;
var bson_3 = bson.BSON_INT64_MAX;
var bson_4 = bson.BSON_INT64_MIN;
var bson_5 = bson.JS_INT_MAX;
var bson_6 = bson.JS_INT_MIN;
var bson_7 = bson.BSON_DATA_NUMBER;
var bson_8 = bson.BSON_DATA_STRING;
var bson_9 = bson.BSON_DATA_OBJECT;
var bson_10 = bson.BSON_DATA_ARRAY;
var bson_11 = bson.BSON_DATA_BINARY;
var bson_12 = bson.BSON_DATA_UNDEFINED;
var bson_13 = bson.BSON_DATA_OID;
var bson_14 = bson.BSON_DATA_BOOLEAN;
var bson_15 = bson.BSON_DATA_DATE;
var bson_16 = bson.BSON_DATA_NULL;
var bson_17 = bson.BSON_DATA_REGEXP;
var bson_18 = bson.BSON_DATA_DBPOINTER;
var bson_19 = bson.BSON_DATA_CODE;
var bson_20 = bson.BSON_DATA_SYMBOL;
var bson_21 = bson.BSON_DATA_CODE_W_SCOPE;
var bson_22 = bson.BSON_DATA_INT;
var bson_23 = bson.BSON_DATA_TIMESTAMP;
var bson_24 = bson.BSON_DATA_LONG;
var bson_25 = bson.BSON_DATA_DECIMAL128;
var bson_26 = bson.BSON_DATA_MIN_KEY;
var bson_27 = bson.BSON_DATA_MAX_KEY;
var bson_28 = bson.BSON_BINARY_SUBTYPE_DEFAULT;
var bson_29 = bson.BSON_BINARY_SUBTYPE_FUNCTION;
var bson_30 = bson.BSON_BINARY_SUBTYPE_BYTE_ARRAY;
var bson_31 = bson.BSON_BINARY_SUBTYPE_UUID;
var bson_32 = bson.BSON_BINARY_SUBTYPE_MD5;
var bson_33 = bson.BSON_BINARY_SUBTYPE_USER_DEFINED;
var bson_34 = bson.Code;
var bson_35 = bson.BSONSymbol;
var bson_36 = bson.DBRef;
var bson_37 = bson.Binary;
var bson_38 = bson.ObjectId;
var bson_39 = bson.Long;
var bson_40 = bson.Timestamp;
var bson_41 = bson.Double;
var bson_42 = bson.Int32;
var bson_43 = bson.MinKey;
var bson_44 = bson.MaxKey;
var bson_45 = bson.BSONRegExp;
var bson_46 = bson.Decimal128;
var bson_47 = bson.serialize;
var bson_48 = bson.serializeWithBufferAndIndex;
var bson_49 = bson.deserialize;
var bson_50 = bson.calculateObjectSize;
var bson_51 = bson.deserializeStream;
var bson_52 = bson.setInternalBufferSize;
var bson_53 = bson.ObjectID;
var bson_54 = bson.EJSON;

/* harmony default export */ __webpack_exports__["default"] = (bson);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const preserveCamelCase = string => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());

	return postProcess(input);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports.default = camelCase;


/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "./node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "./node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "./node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "./node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "./node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "./node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "./node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "./node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_baseSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),

/***/ "./node_modules/lodash/_baseSlice.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseSlice.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_baseUnset.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnset.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    last = __webpack_require__(/*! ./last */ "./node_modules/lodash/last.js"),
    parent = __webpack_require__(/*! ./_parent */ "./node_modules/lodash/_parent.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;


/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "./node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "./node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "./node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(/*! ./memoize */ "./node_modules/lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_parent.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_parent.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js"),
    baseSlice = __webpack_require__(/*! ./_baseSlice */ "./node_modules/lodash/_baseSlice.js");

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "./node_modules/lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/lodash/cloneDeep.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/cloneDeep.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(/*! ./_baseClone */ "./node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "./node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "./node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/last.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/last.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "./node_modules/lodash/set.js":
/*!************************************!*\
  !*** ./node_modules/lodash/set.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseSet = __webpack_require__(/*! ./_baseSet */ "./node_modules/lodash/_baseSet.js");

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

module.exports = set;


/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "./node_modules/lodash/unset.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/unset.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseUnset = __webpack_require__(/*! ./_baseUnset */ "./node_modules/lodash/_baseUnset.js");

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 7 } }] };
 * _.unset(object, 'a[0].b.c');
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 *
 * _.unset(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

module.exports = unset;


/***/ }),

/***/ "./node_modules/long/src/long.js":
/*!***************************************!*\
  !*** ./node_modules/long/src/long.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/auth/base.js":
/*!***************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/auth/base.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __webpack_require__(/*! ../lib/request */ "./node_modules/tcb-js-sdk/dist/lib/request.js");
var cache_1 = __webpack_require__(/*! ../lib/cache */ "./node_modules/tcb-js-sdk/dist/lib/cache.js");
var types_1 = __webpack_require__(/*! ../types */ "./node_modules/tcb-js-sdk/dist/types.js");
var default_1 = (function () {
    function default_1(config) {
        this.httpRequest = new request_1.Request(config);
        this.cache = new cache_1.Cache(config.persistence);
        this.accessTokenKey = types_1.ACCESS_TOKEN + "_" + config.env;
        this.accessTokenExpireKey = types_1.ACCESS_TOKEN_Expire + "_" + config.env;
        this.refreshTokenKey = types_1.REFRESH_TOKEN + "_" + config.env;
    }
    default_1.prototype.setRefreshToken = function (refreshToken) {
        this.cache.removeStore(this.accessTokenKey);
        this.cache.removeStore(this.accessTokenExpireKey);
        this.cache.setStore(this.refreshTokenKey, refreshToken);
    };
    default_1.prototype.getRefreshTokenByWXCode = function (appid, loginType, code, hybridMiniapp) {
        if (hybridMiniapp === void 0) { hybridMiniapp = '0'; }
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                action = 'auth.getJwt';
                return [2, this.httpRequest.send(action, { appid: appid, loginType: loginType, code: code, hybridMiniapp: hybridMiniapp }).then(function (res) {
                        if (res.code) {
                            throw new Error("[tcb-js-sdk] \u5FAE\u4FE1\u767B\u5F55\u5931\u8D25: " + res.code);
                        }
                        if (res.refresh_token) {
                            return {
                                refreshToken: res.refresh_token,
                                accessToken: res.access_token,
                                accessTokenExpire: res.access_token_expire
                            };
                        }
                        else {
                            throw new Error("[tcb-js-sdk] getJwt\u672A\u8FD4\u56DErefreshToken");
                        }
                    })];
            });
        });
    };
    return default_1;
}());
exports.default = default_1;


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/auth/index.js":
/*!****************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/auth/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var weixinAuthProvider_1 = __webpack_require__(/*! ./weixinAuthProvider */ "./node_modules/tcb-js-sdk/dist/auth/weixinAuthProvider.js");
var base_1 = __webpack_require__(/*! ./base */ "./node_modules/tcb-js-sdk/dist/auth/base.js");
var events_1 = __webpack_require__(/*! ../lib/events */ "./node_modules/tcb-js-sdk/dist/lib/events.js");
var Auth = (function (_super) {
    __extends(Auth, _super);
    function Auth(config) {
        var _this = _super.call(this, config) || this;
        _this.config = config;
        _this.customAuthProvider = new base_1.default(_this.config);
        return _this;
    }
    Auth.prototype.weixinAuthProvider = function (_a) {
        var appid = _a.appid, scope = _a.scope, loginMode = _a.loginMode, state = _a.state;
        return new weixinAuthProvider_1.default(this.config, appid, scope, loginMode, state);
    };
    Auth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cache, refreshTokenKey, accessTokenKey, accessTokenExpireKey, action;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.httpRequest, cache = _a.cache, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        action = 'auth.logout';
                        return [4, this.httpRequest.send(action, { refresh_token: cache.getStore(refreshTokenKey) })];
                    case 1:
                        _b.sent();
                        cache.removeStore(refreshTokenKey);
                        cache.removeStore(accessTokenKey);
                        cache.removeStore(accessTokenExpireKey);
                        return [2];
                }
            });
        });
    };
    Auth.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4, this.httpRequest.getAccessToken()];
                    case 1: return [2, (_a.accessToken = (_b.sent()).accessToken,
                            _a.env = this.config.env,
                            _a)];
                }
            });
        });
    };
    Auth.prototype.onLoginStateExpire = function (callback) {
        events_1.addEventListener('loginStateExpire', callback);
    };
    Auth.prototype.getLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cache, refreshTokenKey, accessTokenKey, refreshToken, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.httpRequest, cache = _a.cache, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey;
                        refreshToken = cache.getStore(refreshTokenKey);
                        if (!refreshToken) return [3, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.httpRequest.refreshAccessToken()];
                    case 2:
                        _b.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _b.sent();
                        return [2];
                    case 4: return [2, {
                            credential: {
                                refreshToken: refreshToken,
                                accessToken: cache.getStore(accessTokenKey)
                            }
                        }];
                    case 5: return [2];
                }
            });
        });
    };
    Auth.prototype.signInWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof ticket !== 'string') {
                            throw new Error('ticket must be a string');
                        }
                        return [4, this.httpRequest.send('auth.signInWithTicket', {
                                ticket: ticket
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.refresh_token) return [3, 3];
                        this.customAuthProvider.setRefreshToken(res.refresh_token);
                        return [4, this.httpRequest.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        return [2, {
                                credential: {
                                    refreshToken: res.refresh_token
                                }
                            }];
                    case 3: throw new Error('[tcb-js-sdk] 自定义登录失败');
                }
            });
        });
    };
    Auth.prototype.shouldRefreshAccessToken = function (hook) {
        this.httpRequest._shouldRefreshAccessTokenHook = hook.bind(this);
    };
    Auth.prototype.getUserInfo = function () {
        var action = 'auth.getUserInfo';
        return this.httpRequest.send(action, {}).then(function (res) {
            if (res.code) {
                return res;
            }
            else {
                return __assign({}, res.data, { requestId: res.seqId });
            }
        });
    };
    return Auth;
}(base_1.default));
exports.default = Auth;


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/auth/weixinAuthProvider.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/auth/weixinAuthProvider.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(/*! ../lib/util */ "./node_modules/tcb-js-sdk/dist/lib/util.js");
var base_1 = __webpack_require__(/*! ./base */ "./node_modules/tcb-js-sdk/dist/auth/base.js");
var AllowedScopes;
(function (AllowedScopes) {
    AllowedScopes["snsapi_base"] = "snsapi_base";
    AllowedScopes["snsapi_userinfo"] = "snsapi_userinfo";
    AllowedScopes["snsapi_miniapp"] = "snsapi_miniapp";
    AllowedScopes["snsapi_login"] = "snsapi_login";
})(AllowedScopes || (AllowedScopes = {}));
var LoginModes;
(function (LoginModes) {
    LoginModes["redirect"] = "redirect";
    LoginModes["prompt"] = "prompt";
})(LoginModes || (LoginModes = {}));
var default_1 = (function (_super) {
    __extends(default_1, _super);
    function default_1(config, appid, scope, loginMode, state) {
        var _this = this;
        if (scope === AllowedScopes.snsapi_miniapp) {
            config.mode = "WX_MINIAPP";
        }
        _this = _super.call(this, config) || this;
        _this.config = config;
        _this.appid = appid;
        _this.scope = scope;
        _this.state = state || 'weixin';
        _this.loginMode = loginMode || 'redirect';
        return _this;
    }
    default_1.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, accessTokenExpire, code, _a, loginType, refreshTokenRes, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accessToken = this.cache.getStore(this.accessTokenKey);
                        accessTokenExpire = this.cache.getStore(this.accessTokenExpireKey);
                        if (accessToken) {
                            if (accessTokenExpire && accessTokenExpire > Date.now()) {
                                return [2, {
                                        credential: {
                                            accessToken: accessToken,
                                            refreshToken: this.cache.getStore(this.refreshTokenKey)
                                        }
                                    }];
                            }
                            else {
                                this.cache.removeStore(this.accessTokenKey);
                                this.cache.removeStore(this.accessTokenExpireKey);
                            }
                        }
                        if (Object.values(AllowedScopes).includes(AllowedScopes[this.scope]) === false) {
                            throw new Error('错误的scope类型');
                        }
                        if (!(this.config.mode === "WEB")) return [3, 2];
                        return [4, util.getWeixinCode()];
                    case 1:
                        _a = _b.sent();
                        return [3, 4];
                    case 2: return [4, util.getMiniAppCode()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        code = _a;
                        if (!code && this.config.mode === "WEB") {
                            return [2, this.redirect()];
                        }
                        loginType = (function (scope) {
                            switch (scope) {
                                case AllowedScopes.snsapi_login:
                                    return 'WECHAT-OPEN';
                                default:
                                    return 'WECHAT-PUBLIC';
                            }
                        })(this.scope);
                        return [4, this.getRefreshTokenByWXCode(this.appid, loginType, code, this.scope === AllowedScopes.snsapi_miniapp ? '1' : '0')];
                    case 5:
                        refreshTokenRes = _b.sent();
                        refreshToken = refreshTokenRes.refreshToken;
                        this.cache.setStore(this.refreshTokenKey, refreshToken);
                        if (refreshTokenRes.accessToken) {
                            this.cache.setStore(this.accessTokenKey, refreshTokenRes.accessToken);
                        }
                        if (refreshTokenRes.accessTokenExpire) {
                            this.cache.setStore(this.accessTokenExpireKey, refreshTokenRes.accessTokenExpire + Date.now());
                        }
                        return [2, {
                                credential: {
                                    refreshToken: refreshToken
                                }
                            }];
                }
            });
        });
    };
    default_1.prototype.redirect = function () {
        var currUrl = util.removeParam('code', location.href);
        currUrl = util.removeParam('state', currUrl);
        currUrl = encodeURIComponent(currUrl);
        var host = '//open.weixin.qq.com/connect/oauth2/authorize';
        if (this.scope === 'snsapi_login') {
            host = '//open.weixin.qq.com/connect/qrconnect';
        }
        if (LoginModes[this.loginMode] === 'redirect') {
            location.href = host + "?appid=" + this.appid + "&redirect_uri=" + currUrl + "&response_type=code&scope=" + this.scope + "&state=" + this.state + "#wechat_redirect";
        }
    };
    return default_1;
}(base_1.default));
exports.default = default_1;


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/functions/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/functions/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __webpack_require__(/*! ../lib/request */ "./node_modules/tcb-js-sdk/dist/lib/request.js");
var util_1 = __webpack_require__(/*! ../lib/util */ "./node_modules/tcb-js-sdk/dist/lib/util.js");
exports.callFunction = function (_a, callback) {
    var name = _a.name, data = _a.data;
    callback = callback || util_1.createPromiseCallback();
    try {
        data = data ? JSON.stringify(data) : '';
    }
    catch (e) {
        return Promise.reject(e);
    }
    if (!name) {
        return Promise.reject(new Error('函数名不能为空'));
    }
    var action = 'functions.invokeFunction';
    var params = {
        function_name: name,
        request_data: data
    };
    var httpRequest = new request_1.Request(this.config);
    httpRequest.send(action, params).then(function (res) {
        if (res.code) {
            callback(null, res);
        }
        else {
            var result = res.data.response_data;
            try {
                result = JSON.parse(res.data.response_data);
                callback(null, {
                    result: result,
                    requestId: res.requestId
                });
            }
            catch (e) {
                callback(new Error('response data must be json'));
            }
        }
        return callback.promise;
    }).catch(function (err) {
        callback(err);
    });
    return callback.promise;
};


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var database_1 = __webpack_require__(/*! @cloudbase/database */ "./node_modules/@cloudbase/database/dist/esm/index.js");
var Storage = __webpack_require__(/*! ./storage */ "./node_modules/tcb-js-sdk/dist/storage/index.js");
var auth_1 = __webpack_require__(/*! ./auth */ "./node_modules/tcb-js-sdk/dist/auth/index.js");
var Functions = __webpack_require__(/*! ./functions */ "./node_modules/tcb-js-sdk/dist/functions/index.js");
var request_1 = __webpack_require__(/*! ./lib/request */ "./node_modules/tcb-js-sdk/dist/lib/request.js");
var events_1 = __webpack_require__(/*! ./lib/events */ "./node_modules/tcb-js-sdk/dist/lib/events.js");
var DEFAULT_INIT_CONFIG = {
    timeout: 15000,
    mode: "WEB"
};
var TCB = (function () {
    function TCB(config) {
        this.config = config ? config : this.config;
        this.authObj = undefined;
    }
    TCB.prototype.init = function (config) {
        this.config = __assign({}, DEFAULT_INIT_CONFIG, config);
        return new TCB(this.config);
    };
    TCB.prototype.database = function (dbConfig) {
        database_1.Db.reqClass = request_1.Request;
        if (!this.authObj) {
            console.warn('需要app.auth()授权');
            return;
        }
        database_1.Db.getAccessToken = this.authObj.getAccessToken.bind(this.authObj);
        if (!database_1.Db.ws) {
            database_1.Db.ws = null;
        }
        return new database_1.Db(__assign({}, this.config, dbConfig));
    };
    TCB.prototype.auth = function (_a) {
        var persistence = (_a === void 0 ? {} : _a).persistence;
        if (this.authObj) {
            console.warn('tcb实例只存在一个auth对象');
            return this.authObj;
        }
        Object.assign(this.config, { persistence: persistence || 'session' });
        this.authObj = new auth_1.default(this.config);
        return this.authObj;
    };
    TCB.prototype.on = function (eventName, callback) {
        return events_1.addEventListener.apply(this, [eventName, callback]);
    };
    TCB.prototype.callFunction = function (params, callback) {
        return Functions.callFunction.apply(this, [params, callback]);
    };
    TCB.prototype.deleteFile = function (params, callback) {
        return Storage.deleteFile.apply(this, [params, callback]);
    };
    TCB.prototype.getTempFileURL = function (params, callback) {
        return Storage.getTempFileURL.apply(this, [params, callback]);
    };
    TCB.prototype.downloadFile = function (params, callback) {
        return Storage.downloadFile.apply(this, [params, callback]);
    };
    TCB.prototype.uploadFile = function (params, callback) {
        return Storage.uploadFile.apply(this, [params, callback]);
    };
    return TCB;
}());
var tcb = new TCB();
try {
    window.tcb = tcb;
}
catch (e) { }
module.exports = tcb;


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/lib/cache.js":
/*!***************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/lib/cache.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = (function () {
    function Cache(persistence) {
        switch (persistence) {
            case 'local':
                this.storageClass = localStorage;
                break;
            case 'none':
                this.storageClass = new TcbObject();
                break;
            case 'weixin':
                this.storageClass = new TcbMiniappStorage();
                break;
            default:
                this.storageClass = sessionStorage;
                break;
        }
    }
    Cache.prototype.setStore = function (key, value, version) {
        try {
            if (!this.storageClass) {
                return;
            }
        }
        catch (e) {
            return;
        }
        var content = '';
        var d = {};
        d.version = version || 'localCachev1';
        d.content = value;
        content = JSON.stringify(d);
        try {
            this.storageClass.setItem(key, content);
        }
        catch (e) {
            return;
        }
        return;
    };
    Cache.prototype.getStore = function (key, version) {
        try {
            if (process && process.env && process.env.tcb_token) {
                return process.env.tcb_token;
            }
            if (!this.storageClass) {
                return;
            }
        }
        catch (e) {
            return '';
        }
        version = version || 'localCachev1';
        var content = this.storageClass.getItem(key);
        if (!content) {
            return '';
        }
        if (content.indexOf(version) >= 0) {
            var d = JSON.parse(content);
            return d.content;
        }
        else {
            return '';
        }
    };
    Cache.prototype.removeStore = function (key) {
        this.storageClass.removeItem(key);
    };
    return Cache;
}());
exports.Cache = Cache;
var TcbObject = (function () {
    function TcbObject() {
        if (!window['tcbObject']) {
            window['tcbObject'] = {};
        }
    }
    TcbObject.prototype.setItem = function (key, value) {
        window['tcbObject'][key] = value;
    };
    TcbObject.prototype.getItem = function (key) {
        return window['tcbObject'][key];
    };
    TcbObject.prototype.removeItem = function (key) {
        delete window['tcbObject'][key];
    };
    TcbObject.prototype.clear = function () {
        delete window['tcbObject'];
    };
    return TcbObject;
}());
var TcbMiniappStorage = (function () {
    function TcbMiniappStorage() {
    }
    TcbMiniappStorage.prototype.setItem = function (key, value) {
        wx.setStorageSync(key, value);
    };
    TcbMiniappStorage.prototype.getItem = function (key) {
        return wx.getStorageSync(key);
    };
    TcbMiniappStorage.prototype.removeItem = function (key) {
        wx.removeStorageSync(key);
    };
    TcbMiniappStorage.prototype.clear = function () {
        wx.clearStorageSync();
    };
    return TcbMiniappStorage;
}());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/lib/events.js":
/*!****************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/lib/events.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
var ee = new EventEmitter();
function addEventListener(event, listener) {
    ee.on(event, listener);
}
exports.addEventListener = addEventListener;
function activateEvent(event, data) {
    ee.emit(event, data);
}
exports.activateEvent = activateEvent;


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/lib/request.js":
/*!*****************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/lib/request.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! ../types */ "./node_modules/tcb-js-sdk/dist/types.js");
var cache_1 = __webpack_require__(/*! ./cache */ "./node_modules/tcb-js-sdk/dist/lib/cache.js");
var events_1 = __webpack_require__(/*! ./events */ "./node_modules/tcb-js-sdk/dist/lib/events.js");
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var actionsWithoutAccessToken = [
    'auth.getJwt',
    'auth.logout',
    'auth.signInWithTicket'
];
var RequestMethods = (function () {
    function RequestMethods(mode) {
        if (mode === void 0) { mode = "WEB"; }
        this._mode = mode;
    }
    RequestMethods.prototype.post = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._mode;
                        switch (_a) {
                            case "WEB": return [3, 1];
                            case "WX_MINIAPP": return [3, 3];
                        }
                        return [3, 5];
                    case 1: return [4, this._postWeb(url, data, options)];
                    case 2:
                        res = _b.sent();
                        return [3, 5];
                    case 3: return [4, this._postWxMiniApp("https:" + url, data, options)];
                    case 4:
                        res = _b.sent();
                        return [3, 5];
                    case 5: return [2, res];
                }
            });
        });
    };
    RequestMethods.prototype.upload = function (url, filePath, key, data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._mode;
                        switch (_a) {
                            case "WEB": return [3, 1];
                            case "WX_MINIAPP": return [3, 3];
                        }
                        return [3, 5];
                    case 1:
                        data.append('file', filePath);
                        data.append('key', key);
                        return [4, this._uploadWeb(url, data, options)];
                    case 2:
                        res = _b.sent();
                        return [3, 5];
                    case 3: return [4, this._uploadWxMiniApp("https:" + url, filePath, key, data, options)];
                    case 4:
                        res = _b.sent();
                        return [3, 5];
                    case 5: return [2, res];
                }
            });
        });
    };
    RequestMethods.prototype.download = function (url) {
        switch (this._mode) {
            case "WEB":
                this._downloadWeb(url);
                break;
            case "WX_MINIAPP":
                this._downloadWxMiniApp(url);
                break;
        }
    };
    RequestMethods.prototype._uploadWeb = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return axios_1.default.post(url, data, options);
    };
    RequestMethods.prototype._uploadWxMiniApp = function (url, filePath, key, formData, options) {
        if (formData === void 0) { formData = {}; }
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve) {
            wx.uploadFile(__assign({ url: url,
                filePath: filePath, name: key, formData: formData }, options, { success: function (res) {
                    resolve(res);
                },
                fail: function (err) {
                    resolve(err);
                } }));
        });
    };
    RequestMethods.prototype._downloadWeb = function (url) {
        axios_1.default
            .get(url, {
            responseType: 'blob'
        })
            .then(function (response) {
            var url = window.URL.createObjectURL(new Blob([response.data]));
            var link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        });
    };
    RequestMethods.prototype._downloadWxMiniApp = function (url) {
        wx.downloadFile({ url: url });
    };
    RequestMethods.prototype._postWeb = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return axios_1.default.post(url, data, options);
    };
    RequestMethods.prototype._postWxMiniApp = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            wx.request(__assign({ url: url,
                data: data, method: 'POST' }, options, { success: function (res) {
                    resolve(res);
                },
                fail: function (err) {
                    reject(err);
                } }));
        });
    };
    return RequestMethods;
}());
var DEFAULT_REQUEST_CONFIG = {
    mode: "WEB"
};
var Request = (function (_super) {
    __extends(Request, _super);
    function Request(config) {
        if (config === void 0) { config = DEFAULT_REQUEST_CONFIG; }
        var _this = _super.call(this, config.mode) || this;
        _this.config = config;
        _this.cache = new cache_1.Cache(config.persistence);
        _this.accessTokenKey = types_1.ACCESS_TOKEN + "_" + config.env;
        _this.accessTokenExpireKey = types_1.ACCESS_TOKEN_Expire + "_" + config.env;
        _this.refreshTokenKey = types_1.REFRESH_TOKEN + "_" + config.env;
        return _this;
    }
    Request.prototype.refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cache.removeStore(this.accessTokenKey);
                        this.cache.removeStore(this.accessTokenExpireKey);
                        refreshToken = this.cache.getStore(this.refreshTokenKey);
                        if (!refreshToken) {
                            throw new Error('[tcb-js-sdk] 未登录CloudBase');
                        }
                        return [4, this.request('auth.getJwt', {
                                refresh_token: refreshToken
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.data.code === 'SIGN_PARAM_INVALID' || response.data.code === 'REFRESH_TOKEN_EXPIRED') {
                            events_1.activateEvent('loginStateExpire');
                            this.cache.removeStore(this.refreshTokenKey);
                            throw new Error("[tcb-js-sdk] \u5237\u65B0access token\u5931\u8D25\uFF1A" + response.data.code);
                        }
                        if (response.data.access_token) {
                            events_1.activateEvent('refreshAccessToken');
                            this.cache.setStore(this.accessTokenKey, response.data.access_token);
                            this.cache.setStore(this.accessTokenExpireKey, response.data.access_token_expire + Date.now());
                            return [2, {
                                    accessToken: response.data.access_token,
                                    accessTokenExpire: response.data.access_token_expire
                                }];
                        }
                        return [2];
                }
            });
        });
    };
    Request.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, accessTokenExpire, shouldRefreshAccessToken, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accessToken = this.cache.getStore(this.accessTokenKey);
                        accessTokenExpire = this.cache.getStore(this.accessTokenExpireKey);
                        shouldRefreshAccessToken = true;
                        _a = this._shouldRefreshAccessTokenHook;
                        if (!_a) return [3, 2];
                        return [4, this._shouldRefreshAccessTokenHook(accessToken, accessTokenExpire)];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            shouldRefreshAccessToken = false;
                        }
                        if ((!accessToken || !accessTokenExpire || accessTokenExpire < Date.now()) && shouldRefreshAccessToken) {
                            return [2, this.refreshAccessToken()];
                        }
                        else {
                            return [2, {
                                    accessToken: accessToken,
                                    accessTokenExpire: accessTokenExpire
                                }];
                        }
                        return [2];
                }
            });
        });
    };
    Request.prototype.request = function (action, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType, tmpObj, _a, payload, key, opts, newUrl, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentType = 'application/x-www-form-urlencoded';
                        tmpObj = __assign({ action: action, env: this.config.env, dataVersion: '2019-08-16' }, params);
                        if (!(actionsWithoutAccessToken.indexOf(action) === -1)) return [3, 2];
                        _a = tmpObj;
                        return [4, this.getAccessToken()];
                    case 1:
                        _a.access_token = (_b.sent()).accessToken;
                        _b.label = 2;
                    case 2:
                        if (action === 'storage.uploadFile') {
                            payload = new FormData();
                            for (key in payload) {
                                if (payload.hasOwnProperty(key) && payload[key] !== undefined) {
                                    payload.append(key, tmpObj[key]);
                                }
                            }
                            contentType = 'multipart/form-data';
                        }
                        else {
                            contentType = 'application/json;charset=UTF-8';
                            payload = tmpObj;
                        }
                        opts = {
                            headers: {
                                'content-type': contentType
                            },
                        };
                        if (options && options['onUploadProgress']) {
                            opts.onUploadProgress = options['onUploadProgress'];
                        }
                        newUrl = types_1.BASE_URL + "?env=" + this.config.env;
                        return [4, this.post(newUrl, payload, opts)];
                    case 3:
                        res = _b.sent();
                        if ((Number(res.status) !== 200 && Number(res.statusCode) !== 200) || !res.data) {
                            throw new Error('network request error');
                        }
                        return [2, res];
                }
            });
        });
    };
    Request.prototype.send = function (action, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var slowQueryWarning, response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        slowQueryWarning = setTimeout(function () {
                            console.warn('Database operation is longer than 3s. Please check query performance and your network environment.');
                        }, 3000);
                        return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 1:
                        response = _a.sent();
                        clearTimeout(slowQueryWarning);
                        if (!(response.data.code === 'ACCESS_TOKEN_EXPIRED' && actionsWithoutAccessToken.indexOf(action) === -1)) return [3, 4];
                        return [4, this.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 3:
                        response_1 = _a.sent();
                        if (response_1.data.code) {
                            throw new Error("[" + response_1.data.code + "] " + response_1.data.message);
                        }
                        return [2, response_1.data];
                    case 4:
                        if (response.data.code) {
                            throw new Error("[" + response.data.code + "] " + response.data.message);
                        }
                        return [2, response.data];
                }
            });
        });
    };
    return Request;
}(RequestMethods));
exports.Request = Request;


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/lib/util.js":
/*!**************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/lib/util.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = function (name, url) {
    if (typeof window === 'undefined') {
        return false;
    }
    var u = url || window.location.search;
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = u.substr(u.indexOf('?') + 1).match(reg);
    return r != null ? r[2] : '';
};
exports.getHash = function (name) {
    var matches = window.location.hash.match(new RegExp("[#?&/]" + name + "=([^&#]*)"));
    return matches ? matches[1] : '';
};
exports.removeParam = function (key, sourceURL) {
    var rtn = sourceURL.split('?')[0];
    var param;
    var params_arr = [];
    var queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        params_arr = queryString.split('&');
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split('=')[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + '?' + params_arr.join('&');
    }
    return rtn;
};
exports.createPromiseCallback = function () {
    var cb;
    if (!Promise) {
        cb = function () { };
        cb.promise = {};
        var throwPromiseNotDefined = function () {
            throw new Error('Your Node runtime does support ES6 Promises. ' +
                'Set "global.Promise" to your preferred implementation of promises.');
        };
        Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
        Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
        return cb;
    }
    var promise = new Promise(function (resolve, reject) {
        cb = function (err, data) {
            if (err)
                return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
};
exports.getWeixinCode = function () {
    return exports.getQuery('code') || exports.getHash('code');
};
exports.getMiniAppCode = function () {
    return new Promise(function (resolve) {
        wx.login({
            success: function (res) {
                resolve(res.code);
            },
            fail: function (err) {
                resolve(err);
            }
        });
    });
};


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/storage/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/storage/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __webpack_require__(/*! ../lib/request */ "./node_modules/tcb-js-sdk/dist/lib/request.js");
var util_1 = __webpack_require__(/*! ../lib/util */ "./node_modules/tcb-js-sdk/dist/lib/util.js");
exports.uploadFile = function (params, callback) {
    callback = callback || util_1.createPromiseCallback();
    var metaData = 'storage.getUploadMetadata';
    var httpRequest = new request_1.Request(this.config);
    var cloudPath = params.cloudPath, filePath = params.filePath, onUploadProgress = params.onUploadProgress;
    httpRequest
        .send(metaData, {
        path: cloudPath
    })
        .then(function (metaData) {
        var _a = metaData.data, url = _a.url, authorization = _a.authorization, token = _a.token, fileId = _a.fileId, cosFileId = _a.cosFileId, requestId = metaData.requestId;
        var formData = new FormData();
        formData.append('key', cloudPath);
        formData.append('signature', authorization);
        formData.append('x-cos-meta-fileid', cosFileId);
        formData.append('success_action_status', '201');
        formData.append('x-cos-security-token', token);
        httpRequest.upload(url, filePath, cloudPath, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: onUploadProgress
        }).then(function (res) {
            if (res.status === 201 || res.statusCode === 200) {
                callback(null, {
                    fileID: fileId,
                    requestId: requestId
                });
            }
            else {
                callback(new Error("STORAGE_REQUEST_FAIL: " + res.data));
            }
        })
            .catch(function (err) {
            callback(err);
        });
    })
        .catch(function (err) {
        callback(err);
    });
    return callback.promise;
};
exports.deleteFile = function (_a, callback) {
    var fileList = _a.fileList;
    callback = callback || util_1.createPromiseCallback();
    if (!fileList || !Array.isArray(fileList)) {
        return {
            code: 'INVALID_PARAM',
            message: 'fileList必须是非空的数组'
        };
    }
    for (var _i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
        var file = fileList_1[_i];
        if (!file || typeof file !== 'string') {
            return {
                code: 'INVALID_PARAM',
                message: 'fileList的元素必须是非空的字符串'
            };
        }
    }
    var action = 'storage.batchDeleteFile';
    var params = {
        fileid_list: fileList
    };
    var httpRequest = new request_1.Request(this.config);
    httpRequest
        .send(action, params)
        .then(function (res) {
        if (res.code) {
            callback(null, res);
        }
        else {
            callback(null, {
                fileList: res.data.delete_list,
                requestId: res.requestId
            });
        }
    })
        .catch(function (err) {
        callback(err);
    });
    return callback.promise;
};
exports.getTempFileURL = function (_a, callback) {
    var fileList = _a.fileList;
    callback = callback || util_1.createPromiseCallback();
    if (!fileList || !Array.isArray(fileList)) {
        callback(null, {
            code: 'INVALID_PARAM',
            message: 'fileList必须是非空的数组'
        });
    }
    var file_list = [];
    for (var _i = 0, fileList_2 = fileList; _i < fileList_2.length; _i++) {
        var file = fileList_2[_i];
        if (typeof file === 'object') {
            if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
                callback(null, {
                    code: 'INVALID_PARAM',
                    message: 'fileList的元素必须是包含fileID和maxAge的对象'
                });
            }
            file_list.push({
                fileid: file.fileID,
                max_age: file.maxAge
            });
        }
        else if (typeof file === 'string') {
            file_list.push({
                fileid: file
            });
        }
        else {
            callback(null, {
                code: 'INVALID_PARAM',
                message: 'fileList的元素必须是字符串'
            });
        }
    }
    var action = 'storage.batchGetDownloadUrl';
    var params = {
        file_list: file_list
    };
    var httpRequest = new request_1.Request(this.config);
    httpRequest
        .send(action, params)
        .then(function (res) {
        if (res.code) {
            callback(null, res);
        }
        else {
            callback(null, {
                fileList: res.data.download_list,
                requestId: res.requestId
            });
        }
    })
        .catch(function (err) {
        callback(err);
    });
    return callback.promise;
};
exports.downloadFile = function (_a, callback) {
    var _this = this;
    var fileID = _a.fileID;
    callback = callback || util_1.createPromiseCallback();
    var promise;
    promise = exports.getTempFileURL.call(this, {
        fileList: [
            {
                fileID: fileID,
                maxAge: 600
            }
        ]
    });
    promise.then(function (tmpUrlRes) {
        var res = tmpUrlRes.fileList[0];
        if (res.code !== 'SUCCESS') {
            callback(res);
            return;
        }
        var tmpUrl = res.download_url;
        tmpUrl = encodeURI(tmpUrl);
        var httpRequest = new request_1.Request(_this.config);
        httpRequest.download(tmpUrl);
    });
    return callback.promise;
};


/***/ }),

/***/ "./node_modules/tcb-js-sdk/dist/types.js":
/*!***********************************************!*\
  !*** ./node_modules/tcb-js-sdk/dist/types.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_TOKEN = 'access_token';
exports.ACCESS_TOKEN_Expire = 'access_token_expire';
exports.REFRESH_TOKEN = 'refresh_token';
exports.BASE_URL = '//tcb-api.tencentcloudapi.com/web';


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Query.vue?vue&type=template&id=6545d09f&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/Query.vue?vue&type=template&id=6545d09f& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [_vm._t("default", null, null, { msg: _vm.msg, text: _vm.text })],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/CloudFile.js":
/*!**************************!*\
  !*** ./src/CloudFile.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data: function data() {
    return {
      url: null,
      loading: true,
      error: false
    };
  },
  created: function created() {
    var result;
    return regeneratorRuntime.async(function created$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(this.$cloudbase.getTempFileURL({
              fileList: [this.id]
            }));

          case 2:
            result = _context.sent;
            this.loading = false;
            this.url = result.fileList[0].tempFileURL;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  render: function render() {
    return this.$scopedSlots["default"]({
      url: this.url,
      loading: this.loading
    });
  }
});

/***/ }),

/***/ "./src/DatabaseWatch.js":
/*!******************************!*\
  !*** ./src/DatabaseWatch.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    collection: {
      required: true,
      type: String
    }
  },
  data: function data() {
    return {
      docs: [],
      loading: true,
      error: false
    };
  },
  created: function created() {
    var _this = this;

    return regeneratorRuntime.async(function created$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.$cloudbase.database().collection(this.collection).where({}).watch({
              onChange: function onChange(snapshot) {
                _this.loading = false;
                _this.docs = snapshot.docs;
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  render: function render() {
    return this.$scopedSlots["default"]({
      docs: this.docs,
      loading: this.loading
    });
  }
});

/***/ }),

/***/ "./src/LoginState.js":
/*!***************************!*\
  !*** ./src/LoginState.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    tag: String
  },
  data: function data() {
    return {
      loginState: null,
      loading: true
    };
  },
  created: function created() {
    var loginState;
    return regeneratorRuntime.async(function created$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(this.$cloudbase.auth().getLoginState());

          case 2:
            loginState = _context.sent;
            this.loginState = loginState || null;
            this.loading = false;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  render: function render(h) {
    var result = this.$scopedSlots["default"]({
      loginState: this.loginState,
      loading: this.loading
    });

    if (Array.isArray(result)) {
      return h(this.tag || 'div', result);
    } else {
      return result;
    }
  }
});

/***/ }),

/***/ "./src/Mutation.js":
/*!*************************!*\
  !*** ./src/Mutation.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    mutation: Function
  },
  methods: {
    mutate: function mutate() {
      this.mutation(this.$cloudbase.database());
    }
  },
  render: function render(h) {
    var result = this.$scopedSlots["default"]({
      mutate: this.mutate
    });

    if (Array.isArray(result)) {
      return h(this.tag || 'div', result);
    } else {
      return result;
    }
  }
});

/***/ }),

/***/ "./src/Query.vue":
/*!***********************!*\
  !*** ./src/Query.vue ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Query_vue_vue_type_template_id_6545d09f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Query.vue?vue&type=template&id=6545d09f& */ "./src/Query.vue?vue&type=template&id=6545d09f&");
/* harmony import */ var _Query_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Query.vue?vue&type=script&lang=js& */ "./src/Query.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Query_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Query_vue_vue_type_template_id_6545d09f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Query_vue_vue_type_template_id_6545d09f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/Query.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/Query.vue?vue&type=script&lang=js&":
/*!************************************************!*\
  !*** ./src/Query.vue?vue&type=script&lang=js& ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Query_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./Query.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/Query.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Query_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/Query.vue?vue&type=template&id=6545d09f&":
/*!******************************************************!*\
  !*** ./src/Query.vue?vue&type=template&id=6545d09f& ***!
  \******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Query_vue_vue_type_template_id_6545d09f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./Query.vue?vue&type=template&id=6545d09f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/Query.vue?vue&type=template&id=6545d09f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Query_vue_vue_type_template_id_6545d09f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Query_vue_vue_type_template_id_6545d09f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Query_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Query.vue */ "./src/Query.vue");
/* harmony import */ var _LoginState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginState */ "./src/LoginState.js");
/* harmony import */ var _DatabaseWatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DatabaseWatch */ "./src/DatabaseWatch.js");
/* harmony import */ var _CloudFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CloudFile */ "./src/CloudFile.js");
/* harmony import */ var _Mutation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Mutation */ "./src/Mutation.js");
/* harmony import */ var tcb_js_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tcb-js-sdk */ "./node_modules/tcb-js-sdk/dist/index.js");
/* harmony import */ var tcb_js_sdk__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tcb_js_sdk__WEBPACK_IMPORTED_MODULE_5__);






var plugin = {
  install: function install(Vue, options) {
    Vue.component("Query", _Query_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
    Vue.component("cbLoginState", _LoginState__WEBPACK_IMPORTED_MODULE_1__["default"]);
    Vue.component("cbDatabaseWatch", _DatabaseWatch__WEBPACK_IMPORTED_MODULE_2__["default"]);
    Vue.component("cbCloudFile", _CloudFile__WEBPACK_IMPORTED_MODULE_3__["default"]);
    Vue.component("cbMutation", _Mutation__WEBPACK_IMPORTED_MODULE_4__["default"]); // 4. 添加实例方法

    Vue.prototype.$cloudbase = tcb_js_sdk__WEBPACK_IMPORTED_MODULE_5___default.a.init({
      env: options.env
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (plugin);

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map