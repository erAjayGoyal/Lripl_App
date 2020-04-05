export const getFlattedNode = (n_node, n_data) => {
  var objId = n_node.objectId || n_node.objectid
  var n_name = n_node.name
  var n_type = n_node.type

  let _filterdData = filterTree(n_data, objId, function(
    _filterText,
    n_innernode
  ) {
    let _matched = false
    let _innerObjectId = n_innernode.objectId || n_innernode.objectid
    n_innernode.active = false
    if (
      _innerObjectId &&
      _innerObjectId === _filterText &&
      n_name === n_innernode.name &&
      n_type === n_innernode.type
    ) {
      n_innernode.active = true
      _matched = true
    }
    return _matched
  })
  let _flatArray = faltToArray(_filterdData)
  if (_flatArray && _flatArray.length > 0) {
    _flatArray = _flatArray.filter(function(element) {
      return element !== undefined
    })
  }
  return _flatArray
}
export const faltToArray = _treenode => {
  return recursive(_treenode, [])
}
export const recursive = (n_node, path = []) => {
  path.push(n_node)
  if (n_node && n_node.children) {
    return recursive(n_node.children[0], path)
  } else {
    return path
  }
}

/// copied from the filter

// Helper functions for filtering
export const defaultMatcher = (_filterText, _node) => {
  return _node.name.toLowerCase().indexOf(_filterText.toLowerCase()) !== -1
}

export const findNode = (_node, _filter, _matcher) => {
  return (
    _matcher(_filter, _node) || // i match
    (_node.children && // or i have decendents and one of them match
      _node.children.length &&
      !!_node.children.filter(child => findNode(child, _filter, _matcher))[0])
  )
}

export const filterTree = (_node, _filter, _matcher = defaultMatcher) => {
  // If im an exact match then all my children get to stay
  if (_matcher(_filter, _node) || !_node.children) {
    return _node
  }
  // If not then only keep the ones that match or have matching descendants
  const filtered = _node.children
    .filter(child => findNode(child, _filter, _matcher))
    .map(child => filterTree(child, _filter, _matcher))
  return Object.assign({}, _node, { children: filtered })
}

export const expandFilteredNodes = (
  _node,
  _filter,
  _matcher = defaultMatcher
) => {
  let children = _node.children
  if (!children || children.length === 0) {
    return Object.assign({}, _node, { toggled: false })
  }
  const childrenWithMatches = _node.children.filter(child =>
    findNode(child, _filter, _matcher)
  )
  const shouldExpand = childrenWithMatches.length > 0
  // If im going to expand, go through all the matches and see if thier children need to expand
  if (shouldExpand) {
    children = childrenWithMatches.map(child => {
      return expandFilteredNodes(child, _filter, _matcher)
    })
  }
  return Object.assign({}, _node, {
    children: children,
    toggled: shouldExpand,
  })
}
export const getMatchedNode = (_tree_data, _selected_node, toggle) => {
  if (
    _tree_data.name === _selected_node.name &&
    _tree_data.objectId === _selected_node.objectId &&
    _tree_data.type === _selected_node.type
  ) {
    if (toggle && _selected_node.nodeType === 'app') {
      _tree_data.toggled = toggle
      _tree_data.active = true
    } else {
      _tree_data.active = true
    }
  } else {
    _tree_data.active = false
  }
  if (_tree_data.children && _tree_data.children.length > 0) {
    _tree_data.children.map(_loop_tree => {
      return getMatchedNode(_loop_tree, _selected_node, toggle)
    })
  }
}

export const getActiveNode = (_tree_data, _selected_node) => {
  //selected_node = getFlattedNode(_selected_node, _tree_data)
  let length = _selected_node.length
  _selected_node &&
    _selected_node.map((n_node, index) => {
      if (index === length - 1) {
        getMatchedNode(_tree_data, n_node, false)
      } else {
        getMatchedNode(_tree_data, n_node, true)
      }
      return _selected_node
    })
}
