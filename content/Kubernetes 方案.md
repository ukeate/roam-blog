- 查看
    - 系统日志
        - journalctl -u kubelet | tail
        - kubectl api-resources --verbs=list --namespaced -o name   | xargs -n 1 kubectl get --show-kind --ignore-not-found -nmdw
    - 日志
        - kubectl logs -f --since=5m --all-containers=true -lapp=[svcName] -o wide
        - kubectl get pod [podName] -o yaml
        - kubectl get pods -nmdw-log -l app=logstash-logstash -w    # 等待启动
        - kubectl describe pods [podName]
        - kubectl rollout status deploy/[deployName]          # 查升级记录
        - kubectl get events -njnc
            - oyaml
            - -field-selector=type=Normal            # Normal, Warning
    - 查ns所有资源
        - kubectl api-resources --verbs=list --namespaced -o name | xargs -n 1 kubectl get --show-kind --ignore-not-found -nairflow
    - 查节点详情
        - kubectl get nodes -o json
    - 查扩缩状态
        - kubectl rollout status deploy/[deployName]
    - 查所有nodeport
        - `kubectl get svc --all-namespaces -o go-template='{{range .items}}{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}{{end}}'`
    - 监控
        - kubectl top node -l app=app1
        - kubectl top pod -nmdw --containers
        - kubectl describe PodMetrics p1 -njnc-dev
    - 阻塞直到完成
        - kubectl rollout status --watch --timeout=600s deploy/d1
- 操作
    - 进容器
        - kubectl exec -it [podName]  -- /bin/bash
        - kubectl attach [podName]            # 进入主进程IO
    - 用busybox运行命令
        - kubectl run -it --image busybox -n [nameSpace] [name] --restart=Never --rm
    - 调试
        - kubectl proxy --port=8080 &
            - 以非https形式暴露api
        - kubectl debug a1 -it --image=yauritux/busybox-curl --share-processes --copy-to=a1-debug
            - 嫁接
        - kubectl run -it --rm test --image=a:0.1.0 --command -- /bin/bash
            - 改镜像命令
        - kubectl run -it --rm  busybox1 --image=yauritux/busybox-curl -- /bin/bash
            - 同环境busybox
        - kubectl cp dir1 ns1/po1:/dir1 -c c1
    - 编辑
        - kubectl apply -f a.yml
        - envsubst < jnc.yml |kubectl apply -f -
        - kubectl label ns jnc istio-injection=enabled --overwrite
        - kubectl label ns jnc istio-injection-
- 运维
    - 升级镜像
        - kubectl set image deploy/[deployName] [imageName]=[imageName:Version]
        - kubectl edit deploy/[deployName]
    - 扩容
        - kubectl scale deployment [deployName] --replicas=3
        - kubectl patch deployment [deployName] -p '{"spec":{"replicas":3}}'
    - 重启
        - kubectl rollout restart deploy xxx
    - 回滚
        - kubectl rollout undo deploy xxx
    - 亲和性
        - kubectl get nodes --show-labels
        - kubectl label nodes node1 deploy=mdw
        - kubectl taint nodes node1 key=value:NoSchedule                      # NoSchedule、PreferNoSchedule、NoExecute
    - 打污点
        - kubectl taint nodes node1 key1=a:NoExecute
            - 添加
        - kubectl taint nodes --all key1-
            - 删除
    - 打标签
        - kubectl label nodes node1 a=b
- 清理
    - 删除Evicted/OutOfmemory pod
        - kubectl get po -njnc-dev | grep OutOfmemory |awk '{print$1}' | tr '\n' '' | xargs kubectl delete pod -njnc-dev
    - 强制删除pod
        - kubectl delete po -nmdw --force --grace-period=0
    - 删除pv/pvc
        - kubectl patch pv mdw-mysql-data -p '{"metadata":{"finalizers":null}}'
    - 重建pv
        - kubectl get pvc p1 -o yaml > a.yml
        - 编辑a.yml
        - kubectl apply -f a.yml
    - 删除node
        - kubectl drain node1
    - 维护node不可调度与恢复
        - kubectl cordon node1
        - kubectl uncordon node1
    - 强制删除ns
        - kubectl get ns n1 -o json >tmp.json
            - 删除finalizers内容
        - kubectl proxy
            - curl -k -H "Content-Type: application/json" -X PUT --data-binary @tmp.json http://127.0.0.1:8001/api/v1/namespaces/n1/finalize
- 配置
    - 容器配置
        - HTTPS
            - openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout tls.key -out tls.crt -subj "/CN=my-domain.com"
            - kubectl create secret tls my-domain-com-tls --cert=tls.crt --key=tls.key --namespace=allure-docker-service
            - ingress.yml
                - ```yaml
                  spec:
                    tls:
                    - secretName: my-domain-com-tls
                      hosts:
                        - my-domain.com
                  ```
        - 部署.docker/config.json成secret
            - kubectl create secret generic regcred --from-file=.dockerconfigjson=<path/to/.docker/config.json> --type=kubernetes.io/dockerconfigjson
        - 配置私有仓库
            - kubectl delete secret local
            - kubectl -n iot create secret docker-registry local1 \
            - -docker-server=192.168.99.1:5000 \
            - -docker-username=outrun \
            - -docker-password=pwd \
            - -docker-email=1@qq.com
        - 连阿里云k8s
            - kubectl config set-cluster mrs --server=https://106.14.49.217:6443 --certificate-authority=/home/outrun/scripts/work/mrs-k8s/crt --embed-certs=true
            - kubectl config set-context 297351062922226746-cdf45d630b2284f8ab79bea186c161d9f --cluster=mrs --user=297351062922226746 --namespace=lora-app
            - kubectl config use-context 297351062922226746-cdf45d630b2284f8ab79bea186c161d9f
            - kubectl config set-credentials 297351062922226746  --user=297351062922226746 --client-key=/home/outrun/scripts/work/mrs-k8s/297351062922226746.key.pem --client-certificate=/home/outrun/scripts/work/mrs-k8s/297351062922226746.crt --embed-certs=true
    - 集群配置
        - 默认空间
            - kubectl config set-context --current --namespace=n1
                - kubectl config set-context $(kubectl config current-context) --namespace=n1
        - 配置DNS解析
            - kubectl edit configmap coredns -n kube-system
                - ```yaml
                  apiVersion: v1
                  data:
                  Corefile: |
                      .:53 {
                          errors
                          hosts {
                              192.168.1.107 a.b.com
                          }
                      }
                  ```
            - kubectl rollout restart deploy coredns -n kube-system
