/**
 * @generated SignedSource<<7fb1c442e76fc6d2937ab6a33015fee3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type repoQuery$variables = {
  name: string;
  owner: string;
};
export type repoQuery$data = {
  readonly repository: {
    readonly createdAt: any;
    readonly description: string | null;
    readonly forkCount: number;
    readonly issues: {
      readonly totalCount: number;
    };
    readonly languages: {
      readonly nodes: ReadonlyArray<{
        readonly color: string | null;
        readonly name: string;
      } | null> | null;
      readonly totalCount: number;
    } | null;
    readonly name: string;
    readonly owner: {
      readonly login: string;
    };
    readonly pullRequests: {
      readonly totalCount: number;
    };
    readonly releases: {
      readonly nodes: ReadonlyArray<{
        readonly tagName: string;
      } | null> | null;
    };
    readonly stargazerCount: number;
  } | null;
};
export type repoQuery = {
  response: repoQuery$data;
  variables: repoQuery$variables;
};

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
v8 = [
  {
    "kind": "Literal",
    "name": "states",
    "value": "OPEN"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v10 = [
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": (v8/*: any*/),
  "concreteType": "IssueConnection",
  "kind": "LinkedField",
  "name": "issues",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": "issues(states:\"OPEN\")"
},
v12 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": (v8/*: any*/),
  "concreteType": "PullRequestConnection",
  "kind": "LinkedField",
  "name": "pullRequests",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": "pullRequests(states:\"OPEN\")"
},
v15 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tagName",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v18 = {
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
    "name": "repoQuery",
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
          (v11/*: any*/),
          {
            "alias": null,
            "args": (v12/*: any*/),
            "concreteType": "LanguageConnection",
            "kind": "LinkedField",
            "name": "languages",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Language",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "languages(first:1,orderBy:{\"direction\":\"DESC\",\"field\":\"SIZE\"})"
          },
          (v14/*: any*/),
          {
            "alias": null,
            "args": (v15/*: any*/),
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
                  (v16/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "releases(last:1)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v17/*: any*/)
            ],
            "storageKey": null
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
    "name": "repoQuery",
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
          (v11/*: any*/),
          {
            "alias": null,
            "args": (v12/*: any*/),
            "concreteType": "LanguageConnection",
            "kind": "LinkedField",
            "name": "languages",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Language",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v13/*: any*/),
                  (v18/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "languages(first:1,orderBy:{\"direction\":\"DESC\",\"field\":\"SIZE\"})"
          },
          (v14/*: any*/),
          {
            "alias": null,
            "args": (v15/*: any*/),
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
                  (v16/*: any*/),
                  (v18/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "releases(last:1)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v17/*: any*/),
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          (v18/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6c96dcef3674670e3369543b7a1d61d0",
    "id": null,
    "metadata": {},
    "name": "repoQuery",
    "operationKind": "query",
    "text": "query repoQuery(\n  $owner: String!\n  $name: String!\n) {\n  repository(owner: $owner, name: $name) {\n    forkCount\n    description\n    createdAt\n    name\n    stargazerCount\n    issues(states: OPEN) {\n      totalCount\n    }\n    languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {\n      totalCount\n      nodes {\n        name\n        color\n        id\n      }\n    }\n    pullRequests(states: OPEN) {\n      totalCount\n    }\n    releases(last: 1) {\n      nodes {\n        tagName\n        id\n      }\n    }\n    owner {\n      __typename\n      login\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fa12b16e312f641635d26965924ad1b2";

export default node;
