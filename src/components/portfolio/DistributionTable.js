import React from "react";
import { Table, Image } from "react-bootstrap";

const DistributionTable = (props) => {
  const { tokens, tokenDist } = props;
  const total = (tokenDist || []).reduce(
    (prev, current) => prev + current.inForMinOut,
    0
  );
  return (
    <div className="distribution-table-container">
      <Table className="distribution-table borderless">
        <thead>
          <tr>
            <th className="table-header">Assets</th>
            {/* <th className="table-header">Quantity</th> */}
            {/* <th className="table-header">Price</th> */}
            <th className="table-header">Allocation</th>
            <th className="table-header">Share</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => {
            return (
              <tr className="token-info-row">
                <td>
                  <div className="token-info">
                    <Image src={token.cLogo} className="token-icon"></Image>
                    <p className="token-name">{token.cName}</p>
                  </div>
                </td>
                {/* <td>
                                    <p className="token-quantity">
                                        {token.quantity}
                                    </p>
                                </td>
                                <td>
                                    <p className="token-price">{token.price}</p>
                                </td> */}
                <td>
                  <p className="token-allocation">
                    {(
                      ((
                        (tokenDist || []).find(
                          (e) => e.tokenOut == token.addr
                        ) || { inForMinOut: 0 }
                      ).inForMinOut *
                        100) /
                      (total || 1)
                    ).toFixed(6)}
                    %
                  </p>
                </td>
                <td>
                  <p className="token-allocation">
                    {(token.wt * 10 ** (-1 * token.dcm)).toFixed(token.dcm)}{" "}
                    {token.cName}
                  </p>
                </td>
                {/* <td>
                                    <p className="token-share">{token.share}</p>
                                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DistributionTable;
