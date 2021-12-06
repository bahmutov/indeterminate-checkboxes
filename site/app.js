//  helper function to create nodeArrays (not collections)
const nodeArray = (selector, parent = document) =>
  [].slice.call(parent.querySelectorAll(selector))

//  checkboxes of interest
const allThings = nodeArray('input')

//  global listener
addEventListener('change', (e) => {
  let check = e.target

  //  exit if change event did not come from
  //  our list of allThings
  if (allThings.indexOf(check) === -1) return

  //  check/unchek children (includes check itself)
  const children = nodeArray('input', check.parentNode)
  children.forEach((child) => (child.checked = check.checked))

  //  traverse up from target check
  while (check) {
    //  find parent and sibling checkboxes (quick'n'dirty)
    const parent = check.closest(['ul']).parentNode.querySelector('input')
    const siblings = nodeArray(
      'input',
      parent.closest('li').querySelector(['ul']),
    )

    //  get checked state of siblings
    //  are every or some siblings checked (using Boolean as test function)
    const checkStatus = siblings.map((check) => check.checked)
    const every = checkStatus.every(Boolean)
    const some = checkStatus.some(Boolean)

    //  check parent if all siblings are checked
    //  set indeterminate if not all and not none are checked
    parent.checked = every
    parent.indeterminate = !every && every !== some

    //  prepare for nex loop
    check = check != parent ? parent : 0
  }
})
