import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import {
  Button,
  Row,
  Col,
  FormControl
} from 'react-bootstrap';

class LineItemList extends Component {
  onLineItemDescriptionChange(index, event) {
    this.props.onLineItemDescriptionChange({
      index: index,
      newDescription: event.target.value
    });
  }

  onLineItemQuantityChange(index, event) {
    this.props.onLineItemQuantityChange({
      index: index,
      newQuantity: event.target.value
    });
  }

  onLineItemRateChange(index, event) {
    this.props.onLineItemRateChange({
      index: index,
      newRate: event.target.value
    });
  }

  onLineItemDeleteClick(index) {
    this.props.onLineItemDeleteClick({
      index: index
    });
  }

	render() {
		let lineItems = this.props.lineItems;
		let lineItemRows = lineItems.map((lineItem, index) => {
			return (
			  <Row key={index}>
              <Col sm={8}>
                <FormControl type="text" value={lineItem.description} onChange={this.onLineItemDescriptionChange.bind(this, index)}/>
              </Col>
              <Col sm={1}>
                <FormControl type="number" value={lineItem.quantity} onChange={this.onLineItemQuantityChange.bind(this, index)}/>
              </Col>
              <Col sm={1}>
                <FormControl type="number" value={lineItem.rate} onChange={this.onLineItemRateChange.bind(this, index)}/>
              </Col>
              <Col sm={1}>
                {lineItem.quantity * lineItem.rate}
              </Col>
              <Col sm={1}>
                <Button bsStyle="danger" onClick={this.onLineItemDeleteClick.bind(this, index)}>X</Button>
              </Col>
            </Row>
		)});
		let lineItemsTotal = lineItems.reduce((sum, lineItem) => {
			return sum + lineItem.quantity * lineItem.rate;
		}, 0);
		return (
      <div>
        <Row>
          <Col sm={8}>Item</Col>
          <Col sm={1}>Quantity</Col>
          <Col sm={1}>Rate</Col>
          <Col sm={1}>Amount</Col>
          <Col sm={1}></Col>
        </Row>
        {lineItemRows}
        <Row>
        	<Col sm={8}>
            <Button bsStyle="success" onClick={this.props.onLineItemAddClick}>+ Add Line Item</Button>
          </Col>
          <Col sm={1}></Col>
          <Col sm={1}>Total</Col>
          <Col sm={1}>{lineItemsTotal}</Col>
          <Col sm={1}></Col>
        </Row>
      </div>
          );
	}
}

export default LineItemList;