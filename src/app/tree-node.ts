export class TreeNode {
  constructor(
    public value: number = -1,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
    public isVisited: boolean = false,
    public isTraced: boolean = false
  ) {}
}
