import styles from './index.module.scss'
import { Card, message } from 'antd'
import { Button, Checkbox, Form, Input, Row, Col } from 'antd'
import { useState } from 'react'
import { api_login, api_register } from '../../tools/server'
import { useRequest } from 'ahooks'
import { setAdminToken } from '../../tools/storage'

export default () => {
    const [isLogin, setIsLogin] = useState(true)

    const { loading: loading_login_request, run: login_request } = useRequest(api_login, {
        manual: true,
        onSuccess: ({ data }: any) => {
            message.success('登录成功，正在进入折秋的博客后台...').then(() => {})
            setAdminToken(data?.token)
            setTimeout(() => window.location.reload(), 2000)
        }
    })
    const { loading: loading_register_request, run: register_request } = useRequest(api_register, {
        manual: true,
        onSuccess: () => {
            message.success('注册成功，三秒后跳转到登录页')
            setTimeout(() => setIsLogin(true), 3000)
        }
    })

    const onFinish = (values: any) => {
        console.log('Success:', values)
        return isLogin ? login_request(values) : register_request(values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const changeStatus = (status: boolean) => setIsLogin(status)

    const renderTitleTwo = isLogin ? 'Sign in' : 'Register'

    const renderBottomTips = isLogin ? (
        <div className={styles.tips}>
            <span className={styles.tipsOne}>还没有账户吗？</span>
            <span className={styles.tipsTwo} onClick={() => changeStatus(false)}>
                去注册
            </span>
        </div>
    ) : (
        <div className={styles.tips}>
            <span className={styles.tipsOne}>已有账户？</span>
            <span className={styles.tipsTwo} onClick={() => changeStatus(true)}>
                去登录
            </span>
        </div>
    )

    const renderSubmitBtn = isLogin ? '登录' : '注册'

    return (
        <div className={styles.login}>
            <div className={styles.left}>
                <img src="https://zheqiu.oss-cn-hangzhou.aliyuncs.com/my-blog-pc/login-cover.svg" alt="" />
            </div>
            <div className={styles.right}>
                <Card className={styles.card}>
                    <div className={styles.titleOne}>Welcome !</div>
                    <div className={styles.titleTwo}>{renderTitleTwo}</div>
                    <div className={styles.titleThree}>Personal blog of zheqiu</div>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout={'vertical'}
                    >
                        {!isLogin && (
                            <Form.Item
                                label="邮箱"
                                name="email"
                                rules={[
                                    { required: true, message: '请输入邮箱!' },
                                    { type: 'email', message: '邮箱格式错误!' }
                                ]}
                            >
                                <Input placeholder={'请输入邮箱'} />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="用户名"
                            name="account"
                            rules={[
                                { required: true, message: '请输入用户名!' },
                                {
                                    pattern: /^[a-zA-Z0-9_-]{6,20}$/,
                                    message: '格式错误,仅支持6到20位的字母加数字及下划线'
                                }
                            ]}
                        >
                            <Input placeholder={'请输入用户名'} />
                        </Form.Item>

                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password placeholder={'请输入密码'} />
                        </Form.Item>

                        {!isLogin && (
                            <Form.Item
                                name="confirm"
                                label="确认密码"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: '请确认密码!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error('输入的两个密码不相同!'))
                                        }
                                    })
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        )}

                        <Form.Item className={styles.action}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item>
                                        <Checkbox defaultChecked={true}>Remember me</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={12} className={styles.forgotPassword}>
                                    <Form.Item>
                                        <span className={styles.forgotPasswordText}>忘记密码？</span>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.submit}
                                loading={loading_login_request || loading_register_request}
                            >
                                {renderSubmitBtn}
                            </Button>
                        </Form.Item>
                    </Form>
                    {renderBottomTips}
                </Card>
            </div>
        </div>
    )
}
