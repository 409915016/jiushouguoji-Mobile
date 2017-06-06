<?
$page = !empty($_GET['page']) ? $_GET['page'] : 1;
$n = !empty($_GET['n']) ? $_GET['n'] : 10;
$url = 'http://api.jiushouguoji.hk/app/goods';

$ch = curl_init();

$fields['page'] = $page;
$fields['n'] = $n;

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);

$response = curl_exec($ch);
curl_close($ch);

header('Content-Type:application/json; charset=utf-8');
exit($response);