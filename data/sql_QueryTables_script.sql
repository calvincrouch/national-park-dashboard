select *  from park_detail;

select pv.name as park_visits_name, pd.name as park_details_name from park_visits pv
full outer join park_detail pd on pv.name = pd.name
where pv.name is null or pd.name is null