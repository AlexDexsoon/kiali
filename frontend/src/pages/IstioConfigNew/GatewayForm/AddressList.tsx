import * as React from 'react';
import { Address } from '../../../types/IstioObjects';
import { cellWidth, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { kialiStyle } from 'styles/StyleUtils';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { AddressBuilder } from './AddressBuilder';
import { PFColors } from '../../../components/Pf/PfColors';

type Props = {
  addressList: Address[];
  onChange: (address: Address[]) => void;
};

const noAddressStyle = kialiStyle({
  marginTop: 10,
  color: PFColors.Red100,
  textAlign: 'center',
  width: '100%'
});

const addAddressStyle = kialiStyle({
  marginLeft: 0,
  paddingLeft: 0
});

const headerCells = [
  {
    title: '',
    transforms: [cellWidth(40) as any],
    props: {}
  },
  {
    title: '',
    transforms: [cellWidth(60) as any],
    props: {}
  }
];

export class AddressList extends React.Component<Props> {
  onAddAddress = () => {
    const newAddress: Address = {
      type: 'IPAddress',
      value: ''
    };
    const l = this.props.addressList;
    l.push(newAddress);
    this.setState({}, () => this.props.onChange(l));
  };

  onRemoveAddress = (index: number) => {
    const l = this.props.addressList;
    l.splice(index, 1);
    this.setState({}, () => this.props.onChange(l));
  };

  onChange = (address: Address, i: number) => {
    const l = this.props.addressList;
    l[i] = address;

    this.props.onChange(l);
  };

  render() {
    return (
      <>
        <Table aria-label="Address List">
          <Thead>
            <Tr>
              {headerCells.map(e => (
                <Th>{e.title}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {this.props.addressList.map((address, i) => (
              <AddressBuilder
                address={address}
                onRemoveAddress={this.onRemoveAddress}
                index={i}
                onChange={this.onChange}
              ></AddressBuilder>
            ))}
            <Tr key="addTable">
              <Td>
                <Button
                  variant={ButtonVariant.link}
                  icon={<PlusCircleIcon />}
                  onClick={this.onAddAddress}
                  className={addAddressStyle}
                >
                  Add Address to Addresses List
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        {this.props.addressList.length === 0 && <div className={noAddressStyle}>No Addresses defined</div>}
      </>
    );
  }
}
