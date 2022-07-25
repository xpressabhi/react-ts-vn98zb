import * as React from 'react';

export const Comments = () => {
  const [comments, setComments] = React.useState([
    { id: '1', parentId: null, text: 'this is one' },
    { id: '2', parentId: '1', text: 'this is two' },
    { id: '3', parentId: '2', text: 'this is three' },
    { id: '4', parentId: '2', text: 'this is four' },
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
    setTree(createTree(comments));
  }, [comments]);

  const handleSubmit = (parentId, text) => {
    const id = new Date().getTime().toString(36);
    setComments([...comments, { id, parentId, text }]);
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
  if (!tree || tree.length === 0) return null;
  return (
    <div>
      <ul>
        {tree.map((t) => (
          <li key={t.id}>
            {t.id}-{t.text} <br />
            <InputComponent parentId={t.id} handleSubmit={handleSubmit} />
            <Comment tree={t.children} handleSubmit={handleSubmit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const InputComponent = ({ parentId, handleSubmit }) => {
  const [newComment, setNewComment] = React.useState('');
  return (
    <div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          handleSubmit(parentId, newComment);
          setNewComment('');
        }}
      >
        Save
      </button>
    </div>
  );
};
