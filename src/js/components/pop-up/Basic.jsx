define(['React'], function (React) {
    return React.createClass({
        render: function () {
            return (
                <div className='pop pop-basic'>
                    {this.props.children}
                </div>
            );
        }
    });
});