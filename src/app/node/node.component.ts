import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from '../tree-node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  @Input() node!: TreeNode | null;
  constructor() {}

  ngOnInit(): void {}
}
