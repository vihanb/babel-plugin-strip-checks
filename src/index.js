export default function (babel) {
  const { types: t } = babel;
  
  return {
    visitor: {
      FunctionDeclaration(path) {
        if (!path.node.id) return;
        var name = path.node.id.name;

        if (name === "_classCallCheck" || name === "_possibleConstructorReturn")
          path.remove();
        else if (name === "_inherits")
          path.node.body = t.blockStatement([
            t.expressionStatement(
              t.assignmentExpression(
                "=",
                t.memberExpression(
                  t.Identifier("subClass"),
                  t.Identifier("prototype")
                ),
                t.callExpression(
                  t.memberExpression(
                    t.Identifier("Object"),
                    t.Identifier("create")
                  ),
                  [
                    t.logicalExpression(
                      "&&",
                      t.Identifier("superClass"),
                      t.memberExpression(
                        t.Identifier("superClass"),
                        t.Identifier("prototype")
                      )
                    ),
                    
                    t.objectExpression([
                      t.objectProperty(
                        t.Identifier("constructor"),
                        t.objectExpression([
                          t.objectProperty(
                            t.Identifier("value"),
                            t.Identifier("subClass")
                          ),
                          t.objectProperty(
                            t.Identifier("enumerable"),
                            t.booleanLiteral(false)
                          ),
                          t.objectProperty(
                            t.Identifier("writable"),
                            t.booleanLiteral(false)
                          ),
                          t.objectProperty(
                            t.Identifier("configurable"),
                            t.booleanLiteral(false)
                          )
                        ])
                      )
                    ])
                  ]
              	)
              )
            ),
            t.expressionStatement(
              t.conditionalExpression(
                t.logicalExpression(
                  "&&",
                  t.Identifier("superClass"),
                  t.memberExpression(
                    t.Identifier("Object"),
                    t.Identifier("setPrototypeOf")
                  )
                ),
                t.callExpression(
                  t.memberExpression(
                    t.Identifier("Object"),
                    t.Identifier("setPrototypeOf")
                  ),
                  [
                    t.Identifier("subClass"),
                    t.Identifier("superClass")
                  ]
                ),
                t.assignmentExpression(
                  "=",
                  t.memberExpression(
                    t.Identifier("subClass"),
                    t.Identifier("__proto__")
                  ),
                  t.Identifier("superClass")
                )
              ),
            )
          ]);
      },
      
      ExpressionStatement(path) {
        if (t.isCallExpression(path.node.expression)) {
          var name = path.node.expression.callee.name;
          if (name === "_classCallCheck")
            path.remove();
        }
      },
      
      CallExpression(path) {
        var name = path.node.callee.name;
        if (name === "_possibleConstructorReturn")
          path.replaceWith(t.Identifier("this"));
      }
    }
  };
}
