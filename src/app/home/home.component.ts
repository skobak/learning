import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeNode } from '../tree-node';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Initial hard-coded tree
  nodeLeftL4: TreeNode = new TreeNode(1, null, null);
  nodeRightL4: TreeNode = new TreeNode(2, null, null);
  nodeLeftL3: TreeNode = new TreeNode(3, this.nodeLeftL4, this.nodeRightL4);
  nodeRightL3: TreeNode = new TreeNode(8, null, null);
  nodeLeftL2: TreeNode = new TreeNode(6, this.nodeLeftL3, this.nodeRightL3);
  nodeRightL2: TreeNode = new TreeNode(4, null, null);
  nodeRoot: TreeNode = new TreeNode(10, this.nodeLeftL2, this.nodeRightL2);
  nodePath: TreeNode[] = [];

  // helper variables
  speed: number = 20;
  interval: any;
  result: any[] = [];

  constructor() {}
  ngOnInit(): void {}

  generateRandomBinaryTree() {
    const amount = 20;
    const nodesArr: TreeNode[] = [];
    for (let i = 0; i < amount; i++) {
      const number = Math.floor(Math.random() * 100);
      nodesArr.push(new TreeNode(number, null, null));
    }
    for (let i = 0; i < amount / 2 - 1; i++) {
      nodesArr[i].left = nodesArr[i * 2 + 1];
      nodesArr[i].right = nodesArr[i * 2 + 2];
    }
    this.nodeRoot = nodesArr[0];
  }

  doDepthSearch() {
    if (this.nodePath.length == 0) {
      clearInterval(this.interval);
    } else {
      const lastEmelement = this.nodePath.pop();
      if (lastEmelement?.right != null) {
        this.nodePath.push(lastEmelement.right);
      }
      if (lastEmelement?.left != null) {
        this.nodePath.push(lastEmelement.left);
      }
      lastEmelement!.isVisited = true;
      this.result.push(lastEmelement!.value);
    }
  }

  doBreadthSearch() {
    if (this.nodePath.length == 0) {
      clearInterval(this.interval);
    } else {
      // get last element from a queue
      // add the value and add the left and right nodes to the queue
      const lastEmelement = this.nodePath.pop();
      if (lastEmelement?.left != null) {
        this.nodePath.unshift(lastEmelement.left);
      }
      if (lastEmelement?.right != null) {
        this.nodePath.unshift(lastEmelement.right);
      }
      lastEmelement!.isVisited = true;
      this.result.push(lastEmelement!.value);
    }
  }

  resetResult() {
    this.result = [];
  }

  startBreadthFirstSearch() {
    this.resetResult();
    this.nodePath.push(this.nodeRoot);
    this.interval = setInterval(() => this.doBreadthSearch(), this.speed);
  }
  startDepthFirstSearch() {
    this.resetResult();
    this.nodePath.push(this.nodeRoot);
    this.interval = setInterval(() => this.doDepthSearch(), this.speed);
  }

  invertTree() {
    this.resetResult();
    this.swapLeftRight(this.nodeRoot);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async swapLeftRight(node: TreeNode | null) {
    await this.delay(this.speed);
    if (node == null) {
      return node;
    }
    node.isTraced = true;
    const leftNode = await this.swapLeftRight(node.left);
    const rightNode = await this.swapLeftRight(node.right);

    node.isVisited = true;

    node.right = leftNode;
    node.left = rightNode;
    return node;
  }

  // Not in use
  swapLeftRightWithStack() {
    if (this.nodePath.length == 0) {
      clearInterval(this.interval);
    } else {
      const lastEmelement = this.nodePath.pop();
      if (lastEmelement?.right != null) {
        this.nodePath.push(lastEmelement.right);
      }
      if (lastEmelement?.left != null) {
        this.nodePath.push(lastEmelement.left);
      }
      lastEmelement!.isVisited = true;

      const tempLeft = lastEmelement!.left;
      lastEmelement!.left = lastEmelement!.right;
      lastEmelement!.right = tempLeft;

      this.result.push(lastEmelement!.value);
    }
  }

  async searchInTree(node: TreeNode | null, value: number) {
    await this.delay(this.speed);
    if (node == null) {
      return node;
    }
    if (node.value == value) {
      node.isVisited = true;
      this.result.push('Found');
    }
    node.isTraced = true;
    await this.searchInTree(node.left, value);
    await this.searchInTree(node.right, value);
    return node;
  }
}
