
// 过滤函数
function _filterSex(_itemSex, _sex) {
    if (_sex == _itemSex || (_sex != 'male' && _sex != 'female')) {
        return true;
    }
}

function _filterName(_itemName, _text) {
    var _reg = new RegExp(_text, 'ig');
    if (_reg.test(_itemName)) {
        return true;
    }
}

function _filterKeyword(_itemKeyword, _text) {
    var _reg = new RegExp(_text, 'ig');
    for (var i = 0; i < _itemKeyword.length; i++) {
        if (_reg.test(_itemKeyword[i])) {
            return true;
        }
    }
}

function filter(_data, _store) {
    _data = _data || [];
    _store = _store || {};
    return _data.filter(function (_item) {
        if (_filterSex(_item.sex, _store.sex) && (_store.text == '' || _filterName(_item.name, _store.text) || _filterKeyword(_item.keyword, _store.text))) {
            return true;
        }
    });
}

// 渲染函数
function render(_ele, _data, _store) {
    _ele = _ele || {};
    _data = _data || [];
    var _strTemp = '',
        _reg;
    if (_store.text) {
        _reg = new RegExp(_store.text, 'ig');
    }
    _data.forEach(function (_item) {
        var _name = _item.name,
            _keyword = '';
        if (_reg) {
            _name = _name.replace(_reg, '<em>$&</em>');
        }
        _item.keyword.forEach(function (_kw) {
            if (_reg) {
                _kw = _kw.replace(_reg, '<em>$&</em>');
            }
            _keyword += `<a href="#">${_kw}</a>`;
        });
        _strTemp += `<li><img class="${_item.sex}" src="${_item.head}"><div class="name">${_name}</div><div class="keyword">${_keyword}</div></li>`;
    });
    _ele.innerHTML = _strTemp;
}