/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type mainRendererQueryVariables = {
    owner: string;
    name: string;
};
export type mainRendererQueryResponse = {
    readonly repository: {
        readonly forkCount: number;
        readonly description: string | null;
        readonly createdAt: unknown;
        readonly name: string;
        readonly stargazerCount: number;
        readonly issues: {
            readonly totalCount: number;
        };
        readonly languages: {
            readonly totalCount: number;
            readonly nodes: ReadonlyArray<{
                readonly name: string;
                readonly color: string | null;
            } | null> | null;
        } | null;
        readonly pullRequests: {
            readonly totalCount: number;
        };
        readonly releases: {
            readonly nodes: ReadonlyArray<{
                readonly tagName: string;
            } | null> | null;
        };
    } | null;
};
export type mainRendererQuery = {
    readonly response: mainRendererQueryResponse;
    readonly variables: mainRendererQueryVariables;
};



/*
query mainRendererQuery(
  $owner: String!
  $name: String!
) {
  repository(owner: $owner, name: $name) {
    forkCount
    description
    createdAt
    name
    stargazerCount
    issues {
      totalCount
    }
    languages(last: 10, orderBy: {field: SIZE, direction: DESC}) {
      totalCount
      nodes {
        name
        color
        id
      }
    }
    pullRequests {
      totalCount
    }
    releases(last: 1) {
      nodes {
        tagName
        id
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v2 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "forkCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stargazerCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "IssueConnection",
  "kind": "LinkedField",
  "name": "issues",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "SIZE"
    }
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "PullRequestConnection",
  "kind": "LinkedField",
  "name": "pullRequests",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tagName",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "mainRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "LanguageConnection",
            "kind": "LinkedField",
            "name": "languages",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Language",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "languages(last:10,orderBy:{\"direction\":\"DESC\",\"field\":\"SIZE\"})"
          },
          (v13/*: any*/),
          {
            "alias": null,
            "args": (v14/*: any*/),
            "concreteType": "ReleaseConnection",
            "kind": "LinkedField",
            "name": "releases",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Release",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v15/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "releases(last:1)"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "mainRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "LanguageConnection",
            "kind": "LinkedField",
            "name": "languages",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Language",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v12/*: any*/),
                  (v16/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "languages(last:10,orderBy:{\"direction\":\"DESC\",\"field\":\"SIZE\"})"
          },
          (v13/*: any*/),
          {
            "alias": null,
            "args": (v14/*: any*/),
            "concreteType": "ReleaseConnection",
            "kind": "LinkedField",
            "name": "releases",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Release",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v15/*: any*/),
                  (v16/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "releases(last:1)"
          },
          (v16/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b762d73e6a5dad91eab01def26acf6da",
    "id": null,
    "metadata": {},
    "name": "mainRendererQuery",
    "operationKind": "query",
    "text": "query mainRendererQuery(\n  $owner: String!\n  $name: String!\n) {\n  repository(owner: $owner, name: $name) {\n    forkCount\n    description\n    createdAt\n    name\n    stargazerCount\n    issues {\n      totalCount\n    }\n    languages(last: 10, orderBy: {field: SIZE, direction: DESC}) {\n      totalCount\n      nodes {\n        name\n        color\n        id\n      }\n    }\n    pullRequests {\n      totalCount\n    }\n    releases(last: 1) {\n      nodes {\n        tagName\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a86c9dda0bc87f878e29e5361d8ef4a5';
export default node;
