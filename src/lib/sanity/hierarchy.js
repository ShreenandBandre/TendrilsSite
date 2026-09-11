export function buildHierarchyPaths(items = [], base = "") {
  const byId = new Map(items.map((item) => [item._id, item]));
  const cache = new Map();

  function pathFor(item, stack = new Set()) {
    if (!item?._id) return null;
    if (cache.has(item._id)) return cache.get(item._id);
    if (stack.has(item._id)) return item.slug;
    const nextStack = new Set(stack);
    nextStack.add(item._id);
    const parent = item.parentId ? byId.get(item.parentId) : null;
    const parentPath = parent ? pathFor(parent, nextStack) : "";
    const path = [base, parentPath, item.slug].filter(Boolean).join("/");
    cache.set(item._id, path);
    return path;
  }

  return items.map((item) => ({
    ...item,
    path: pathFor(item),
  }));
}

export function nestedChildren(items = []) {
  const byParent = new Map();
  for (const item of items) {
    const key = item.parentId || "root";
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key).push(item);
  }

  return items.map((item) => ({
    ...item,
    children: byParent.get(item._id) || [],
  }));
}
