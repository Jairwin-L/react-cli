exports.externals = () => {
  return [
    {
      "module": "react",
      "entry": "//unpkg.com/react@17/umd/react.production.min.js",
      "global": "React"
    },
    {
      "module": "react-dom",
      "entry": "//unpkg.com/react-dom@17/umd/react-dom.production.min.js",
      "global": "ReactDOM"
    },
    {
      "module": "react-router-dom",
      "entry": "//cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js",
      "global": "ReactRouterDOM"
    }
  ]
}
