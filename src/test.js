{ this.state.datas.map(x => 
          <div className="table">
            <div className="no">{x.no}</div>
            <div className="perjalanan">{x.perjalanan}</div> 
            <button className="btn-delete" value={ x.no } onClick={ this.deletePerjalanan } >delete</button>
            <button className="btn-edit" value={ x.no } onClick={ this.editPerjalanan } >edit</button>
            <button className="btn-route" >route</button>
          </div>)}

<table style={{ width: "366px"}}>
          <thead>
            <tr>
              <th style={{ width: "31px"}}>No</th>
              <th style={{ width: "200px"}}>Perjalanan</th>
              <th >Aksi</th>
            </tr>
          </thead>   
          <tbody>
            <tr>
              <td>No</td>
              <td>Perjalanan</td>
              <td>Aksi</td>
            </tr>
            <tr>
              <td>No</td>
              <td>Perjalanan</td>
              <td>Aksi</td>
            </tr>
          </tbody>