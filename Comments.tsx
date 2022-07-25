import * as React from 'react';

export const Comments = () => {
  const [comments, setComments] = React.useState([
    { id: 1, parentId: null, text: 'this is one' },
    { id: 2, parentId: 1, text: 'this is two' },
    { id: 3, parentId: 2, text: 'this is three' },
    { id: 4, parentId: 2, text: 'this is four' },
  ]);

  const [tree, setTree] = React.useState([]);

  function createTree(list) {
    var map = {},
      node,
      roots = [],
      i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  React.useEffect(() => {
    const tr = createTree(comments);
    console.log(tr);
    setTree(tr);
  }, [comments]);

  const handleSubmit = (parentId, text) => {
    console.log(parentId, text);
  };

  // setComments();fdfgg

  return (
    <div>
      <h1>Comments</h1>
      <Comment tree={tree} handleSubmit={handleSubmit} />
    </div>
  );
};

const Comment = ({ tree, handleSubmit }) => {
  console.log(tree, 'tree');
  if (!tree || tree.length === 0) return null;
  console.log(tree, 'tree2');
  return (
    <div>
      <ul>
        {tree.map((t) => (
          <li key={t.id}>
            {t.text} <br />
            <InputComponent parentId={t.id} handleSubmit={handleSubmit} />
            <Comment tree={t.children} handleSubmit={handleSubmit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const InputComponent = ({ parentId, handleSubmit }) => {
  const [newComment, setNewComment] = React.useState('new comment');
  const handleChange = (e) => {
    console.log(e.target);
    setNewComment(e.target.value);
  };
  console.log(parentId, '78');
  return (
    <div>
      <input
        type="text"
        // name="newComment"
        value={newComment}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => {
          // e.preventDefault();
          handleSubmit(parentId, newComment);
          // setNewComment('');
        }}
      >
        Save
      </button>
    </div>
  );
};
