

    const wsPort = 8011
    const hostname = '127.0.0.1'
    const ws = new WebSocket(`ws://${hostname}:${wsPort}`)
    ws.onopen = () => {
        // 进入聊天室的提示
        ws.send('欢迎xxx来到xxx的直播间')
    }
    // 接收数据，然后将数据展示到界面上
    ws.onmessage = (msg) => {
        const content = document.querySelector('#content')
        content.innerHTML += msg.data + '<br/>'
    }
    // 异常报出
    // ws.onerror = ( 'error' ) => {
    //   console.log( error )
    // }
    ws.onclose = () => {
        console.log('closed')
    }

    document.querySelector('#submit').addEventListener('click', function () {
        var msg2 = msg.value
        ws.send(msg2)
        msg.value = ''
    }, false)
    
    function chataxios(url, ga, type, val = 0) {
                //console.log(666.6,url, ga, type, val)
                if (type == 8) { //添加
                    axios({
                            method: 'post',
                            url: url + ga + '/' + type,
                            data: val,
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                            }
                        })
                        .then(response => {
                            return response.data;
                        })
                        .catch(error => {
                            return error;
                        });
                } else { //获取
                    axios.get(url + ga + '/' + type + '/' + val)
                        .then(response => {
                            if (response.data.key != val && response.data != val) {
                                this.chatkey = response.data.key;
                                let chatobjurl = response.data.obj;
                                if (!chatobjurl[this.chatkey].o || this.fid == chatobjurl[this.chatkey].o || this.fid == chatobjurl[this.chatkey].i) {
                                    this.chatobj = Object.assign({}, this.chatobj, chatobjurl);
                                    this.asaispeak(chatobjurl);
                                    this.scroll();
                                }
                            }
                        })
                        .catch(error => {
                            return error;
                        });
                }
            }