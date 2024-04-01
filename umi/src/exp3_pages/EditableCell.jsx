import React, { Component } from 'react'
import { Input, Form } from 'antd';

export default class EditableCell extends Component {
	render() {
		const {
			editing,
			dataIndex,
			title,
			inputType,
			record,
			index,
			children,
			...restProps
		} = this.props;

		return (
			<td {...restProps}>
				{
					editing ? (
						<Form.Item
							name={dataIndex}
						>
							<Input />
						</Form.Item>
					) : (
						children
					)
				}
			</td>
		)
	}
}
