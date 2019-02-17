function createStore(_initStore) {
    var _store = {},
        _fnList = [];
    _initStore && _initStore.sex && (_store.sex = _initStore.sex);
    _initStore && _initStore.text && (_store.text = _initStore.text);
    function getStore() {
        return {
            sex: _store.sex,
            text: _store.text
        };
    }
    function dispatch(_type, _value){
        if(_type){
            _store[_type] = _value || '';
        }
        var _self = this;
        _fnList.forEach(function(_fn){
            _fn.call(_self, _self.getStore());
        });
    }
    function subscribe(_callback){
        _fnList.push(_callback);
    }
    return {
        getStore,
        dispatch,
        subscribe
    };
}